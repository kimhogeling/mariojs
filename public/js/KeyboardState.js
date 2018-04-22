const RELEASED = 0
const PRESSED = 1

export default class KeyboardState {
    constructor() {
        this.keyStates = new Map()
        this.keyFunctions = new Map()
    }

    /**
     * @param {Number} key
     * @param {function} fn - Callback function to call on key press
     */
    addKeyFunction(key, fn) {
        this.keyFunctions.set(key, fn)
    }

    handleEvent(event) {
        const key = event.code

        if (!this.keyFunctions.has(key)) {
            // key code is not mapped
            return
        }

        // prevents browser events like scrolling on key down
        event.preventDefault()

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED

        if (this.keyStates.get(key) === keyState) {
            return
        }

        this.keyStates.set(key, keyState)
        this.keyFunctions.get(key)(keyState)
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => this.handleEvent(event))
        })
    }
}
