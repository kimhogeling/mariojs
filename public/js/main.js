import Camera from './Camera.js'
import Timer from './Timer.js'
import { createMario } from './entities.js'
import { loadLevel } from './loaders.js'
import { createCollisionLayer, createCameraLayer } from './layers.js'
import { setupKeyboard } from './input.js'
import { setupMouseControl } from './debug.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then(([mario, level]) => {
    const cam = new Camera()

    mario.pos.set(16, 16)

    level.comp.layers.push(
        createCollisionLayer(level),
        createCameraLayer(cam)
    )

    level.entities.add(mario)

    const input = setupKeyboard(mario)
    input.listenTo(window)

    const timer = new Timer()
    timer.update = function update(deltaTime) {
        level.update(deltaTime)
        level.comp.draw(context, cam)
    }

    timer.start()

    setupMouseControl(canvas, mario, cam)
})
