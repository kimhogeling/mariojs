import Keyboard from './KeyboardState.js'

// use key states of 0 (released) and 1 (pressed) to determine the action
const START_OR_CANCEL = {
    0: 'cancel',
    1: 'start'
}

export function setupKeyboard({ jump, walk }) {
    const keyboard = new Keyboard()

    keyboard.addKeyFunction('Space', keyState => {
        jump[START_OR_CANCEL[keyState]]()
    })

    keyboard.addKeyFunction('ArrowLeft', keyState => {
        walk.dir = -keyState
    })

    keyboard.addKeyFunction('ArrowRight', keyState => {
        walk.dir = keyState
    })

    return keyboard
}
