const RELEASED = 0
const PRESSED = 1

export default class KeyboardState {
    constructor() {
        // holds the current state of a given key
        this.keyStates = new Map()

        // holds the callback functions for a key code
        this.keyMap = new Map()
    }

    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback)
    }

    handleEvent(event) {
        const { keyCode } = event
        if (!this.keyMap.has(keyCode)) {
            // key code is not mapped
            return
        }

        // prevents browser events like scrolling on key down
        event.preventDefault()

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED

        if (this.keyStates.get(keyCode) === keyState) {
            return
        }

        this.keyStates.set(keyCode, keyState)

        this.keyMap.get(keyCode)(keyState)
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => this.handleEvent(event))
        })
    }
}
