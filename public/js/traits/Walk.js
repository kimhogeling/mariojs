import Trait from './Trait.js'

export default class Walk extends Trait {
    constructor() {
        super('walk')

        this.dir = 0
        this.speed = 5000
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir * deltaTime
    }
}
