// Import required modules
const extensionNextConfig = require('./extension.next.config')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const cheerio = require('cheerio')

// Function to get all HTML files from a given folder, including subfolders
function getAllHtmlFiles(folderPath) {
    // Get the list of all files and folders in the given directory
    const fileNames = fs.readdirSync(folderPath)
    
    // Initialize an array to hold HTML files
    const htmlFiles = []
    
    // Filter out HTML files from the list and add to htmlFiles array
    _.map(fileNames, fileName => {
        const filePath = path.join(folderPath, fileName)
        const stats = fs.statSync(filePath)
        if (stats.isFile() && path.extname(filePath) === '.html') {
            htmlFiles.push({
                fileName: fileName.replace(/\.html$/, ''),
                filePath: filePath,
            })
        }
    })

    // Recursively get HTML files from subdirectories
    const subFolders = fileNames.filter(fileName => {
        const filePath = path.join(folderPath, fileName)
        const stats = fs.statSync(filePath)
        return stats.isDirectory()
    })

    _.each(subFolders, subFolder => {
        const subFolderPath = path.join(folderPath, subFolder)
        const subFolderHtmlFiles = getAllHtmlFiles(subFolderPath)
        htmlFiles.push(...subFolderHtmlFiles)
    })

    // Return the list of HTML files
    return htmlFiles
}

// Function to extract inline scripts from an HTML file and save to a new file
function extractInlineScripts(htmlFilePath, outputFilePath) {
    // Read the content of the HTML file
    const html = fs.readFileSync(htmlFilePath, 'utf-8')

    // Load the HTML content using cheerio
    const $ = cheerio.load(html)

    // Select all inline script tags
    const inlineScripts = $('script').filter(function () {
        return !$(this).attr('src')
    })

    // Extract and concatenate the content of inline script tags
    const inlineScriptContent = inlineScripts
        .map(function () {
            return $(this).html()
        })
        .get()
        .join('\n\n')

    // Remove all inline script tags from the HTML
    inlineScripts.remove()

    // Write the concatenated script content to the specified output file
    fs.writeFileSync(outputFilePath, inlineScriptContent)

    // Append the new JS file to the HTML body
    const jsFileName = path.basename(outputFilePath)
    $('body').append(`<script src="${jsFileName}"></script>`)

    // Save the modified HTML back to the original file
    fs.writeFileSync(htmlFilePath, $.html())
}

// Main function to execute after build
const buildAfter = () => {
    // Get the build directory path
    const distDir = extensionNextConfig.distDir
    const htmlFiles = getAllHtmlFiles(distDir)
    if (_.isEmpty(htmlFiles)) return

    // Loop through each HTML file and apply inline script extraction
    _.map(htmlFiles, htmlFile => {
        const { fileName, filePath } = htmlFile
        const outputFilePath = path.join(filePath, '../', `${fileName}.js`)
        extractInlineScripts(filePath, outputFilePath)
    })
}

// Run the main function
buildAfter()
