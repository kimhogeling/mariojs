import Entity from './Entity.js'
import Walk from './traits/Walk.js'
import Jump from './traits/Jump.js'
import { createAnim } from './anim.js'
import { loadSpriteSheet } from './loaders.js'

const SLOW_DRAG = 1 / 1000
const FAST_DRAG = 1 / 5000

export function createMario() {
    return loadSpriteSheet('mario')
    .then(sprite => {
        const mario = new Entity()
        mario.size.set(14, 16)

        mario.addTrait(new Walk())
        mario.walk.dragFactor = SLOW_DRAG
        mario.turbo = function setTurboState(turboOn) {
            this.walk.dragFactor = turboOn
                ? FAST_DRAG
                : SLOW_DRAG
        }

        mario.addTrait(new Jump())

        const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 6)

        function routeFrame(m) {
            if (m.jump.falling) {
                return 'jump'
            }

            if (m.walk.distance <= 0) {
                return 'idle'
            }

            if ((m.vel.x > 0 && m.walk.dir < 0) || (m.vel.x < 0 && m.walk.dir > 0)) {
                return 'break'
            }

            return runAnim(m.walk.distance)
        }

        mario.draw = function drawMario(context) {
            sprite.draw(routeFrame(this), context, 0, 0, this.walk.heading < 0)
        }

        return mario
    })
}
