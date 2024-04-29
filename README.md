
# NextChromeX 🌐
![Next.js](https://img.shields.io/badge/Next.js-13.5.4-000?logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome-Extension-yellow?logo=google-chrome&logoColor=white)

> Your all-in-one open-source starter starter kit for building Chrome extensions with Next.js and Tailwind CSS.

👤 **Developer: [Prasoon Thakur](https://prasoonthakur.com)**  
📝 **Blog: [https://prasoonthakur.com](https://prasoonthakur.com)**

## 🌟 Features
- Utilizes Next.js for seamless UI development
- Styled with Tailwind CSS for rapid design iteration
- Chrome Manifest v3 compliant

## 📚 Table of Contents
- [Directory Structure](#-directory-structure)
- [Build Process](#-build-process)
- [NPM Scripts](#-npm-scripts)
- [Configuration Files](#-configuration-files)

---

## 📁 Directory Structure
Here's how the codebase is organized and what each folder/file corresponds to:

| Code Directory | Output File |
| -------------- | ----------- |
| [`app/pages/options`](./app/pages/options) | `options.html` |
| [`app/pages/popup`](./app/pages/popup) | `popup.html` |
| [`app/scripts/content`](./app/scripts/content) | `content-script.js` |
| [`app/scripts/inject`](./app/scripts/inject) | `inject-script.js` |

---

## 🛠 Build Process

### Standard Method

1. **Install Dependencies**
    ```bash
    npm install
    ```

2. **Compile the Extension**
    ```bash
    npm run build:extension
    ```

3. **Generate Icons**

    To install the required Pillow package, run the following command:
    ```
    python3 -m pip install Pillow
    ```
    
    ```python
    python3 icon_generator.py icon.png
    ```

### Using Bun as an Alternative 🥐

1. **Install Dependencies**
    ```bash
    bun install
    ```

2. **Compile the Extension**
    ```bash
    bun bun:extension
    ```

---

## 📜 NPM Scripts

- **`pack:extensionscript`**: Compiles the actual `content-script.js` and `inject-script.js`.
- **`afterbuild`**: Post-build actions to adhere to Chrome's inline script policies.
- **`zip:extension`**: Creates a ZIP file of the extension for easy distribution.

---

## 📝 Configuration Files

- **`extension.next.config.js`**: The Next.js configuration tailored specifically for the Chrome extension.
- **`extension.webpack.config.js`**: The Webpack setup for packaging various script files.

---

## 📖 Open Source
This project is open to contributions from the developer community. If you find a bug or think of a new feature, please feel free to create an issue or open a pull request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


