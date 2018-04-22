import { Vec2 } from './math.js'

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0)
        this.vel = new Vec2(0, 0)
        this.size = new Vec2(0, 0)

        // to compose everything each entity can do, e.g. mario can walk and jump
        this.traits = []
    }

    addTrait(trait) {
        this.traits.push(trait)
        this[trait.NAME] = trait
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime)
        })
    }
}
