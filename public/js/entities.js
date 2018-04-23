import Entity from './Entity.js'
import Walk from './traits/Walk.js'
import Jump from './traits/Jump.js'
import { createAnim } from './anim.js'
import { loadSpriteSheet } from './loaders.js'

export function createMario() {
    return loadSpriteSheet('mario')
    .then(sprite => {
        const mario = new Entity()
        mario.size.set(14, 16)

        mario.addTrait(new Walk())
        mario.addTrait(new Jump())

        const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10)

        function routeFrame(m) {
            return m.walk.dir !== 0
                ? runAnim(m.walk.distance)
                : 'idle'
        }

        mario.draw = function drawMario(context) {
            sprite.draw(routeFrame(this), context, 0, 0, this.walk.heading < 0)
        }

        return mario
    })
}
