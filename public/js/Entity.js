import { Vec2 } from './math.js'

export class Trait {
    constructor(name) {
        this.NAME = name
    }

    update() {
        console.warn('Unhandled update call in Trait')
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0)
        this.vel = new Vec2(0, 0)

        // to compose everything each entity can do, e.g. mario can jump
        this.traits = []
    }

    addTrait(trait) {
        this.traits.push(trait)
        this[trait.NAME] = trait
    }

    update(deltaTime) {
        if (this.pos.x > 256) {
            this.pos.x = 0
        }
        if (this.pos.y > 240) {
            this.pos.y = 0
        }
        this.traits.forEach(trait => {
            trait.update(this, deltaTime)
        })
    }
}
