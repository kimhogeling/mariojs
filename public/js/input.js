import Keyboard from './KeyboardState.js'

export function setupKeyboard(mario) {
    const input = new Keyboard()

    input.addMapping('KeyJ', keyState => {
        if (keyState) {
            mario.jump.start()
        } else {
            mario.jump.cancel()
        }
    })

    input.addMapping('KeyK', keyState => {
        mario.turbo(keyState)
    })

    input.addMapping('KeyD', keyState => {
        mario.go.dir += keyState
            ? 1
            : -1
    })

    input.addMapping('KeyA', keyState => {
        mario.go.dir += keyState
            ? -1
            : 1
    })

    return input
}
