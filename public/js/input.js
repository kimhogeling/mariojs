import Keyboard from './KeyboardState.js'

// use key states of 0 (released) and 1 (pressed) to determine the action
const START_OR_CANCEL = {
    0: 'cancel',
    1: 'start'
}

export function setupKeyboard(mario) {
    const keyboard = new Keyboard()

    keyboard.addKeyFunction('KeyK', keyState => {
        mario.turbo(keyState)
    })

    keyboard.addKeyFunction('KeyJ', keyState => {
        mario.jump[START_OR_CANCEL[keyState]]()
    })

    keyboard.addKeyFunction('KeyA', keyState => {
        mario.walk.dir += keyState
            ? -1
            : 1
    })

    keyboard.addKeyFunction('KeyD', keyState => {
        mario.walk.dir += keyState
            ? 1
            : -1
    })

    return keyboard
}
