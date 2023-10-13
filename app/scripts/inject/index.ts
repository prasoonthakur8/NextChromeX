;(function (history) {
    var originalPushState = history.pushState

    history.pushState = function (state, title, url) {
        if (typeof history.onpushstate == 'function') {
            history.onpushstate({ state: state })
        }

        // @ts-ignore
        url = url && url.search(/^http/) > -1 ? url : ''

        // history.pushState
        // @ts-ignore
        return originalPushState.apply(history, arguments)
    }
    console.log(history.pushState)
})(history)
