import Keyboard from './KeyboardState.js'
import Timer from './Timer.js'
import { createMario } from './entities.js'
import { loadLevel } from './loaders.js'
import { createCollisionLayer } from './layers.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')
// context.scale(1.5, 1.5)

Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then(([mario, level]) => {

    const gravity = 2000
    mario.pos.set(64, 64)

    level.comp.layers.push(createCollisionLayer(level))

    level.entities.add(mario)

    const SPACE = 32
    const input = new Keyboard()
    input.addMapping(SPACE, keyState => {
        mario.jump[keyState ? 'start' : 'cancel']()
    })
    input.listenTo(window)

    const timer = new Timer()
    timer.update = function update(deltaTime) {
        level.update(deltaTime)
        level.comp.draw(context)
        mario.vel.y += gravity * deltaTime
    }

    timer.start();

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, ({ buttons, offsetX, offsetY }) => {
            if (buttons === 1) {
                mario.vel.set(0, 0)
                mario.pos.set(offsetX, offsetY)
            }
        })
    })
})
