interface History {
    onpushstate: Function
}

interface HTMLInputElement {
    _valueTracker: any
}

interface Event {
    simulated?: boolean
}

interface Chrome {
    [index: string]: any,
}

declare const chrome: Chrome;

