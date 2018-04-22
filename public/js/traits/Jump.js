import Trait from './Trait.js'

export default class Jump extends Trait {
    constructor() {
        super('jump')

        // prevent mario from flying
        this.duration = 0.5
        this.velocity = 200
        this.engageTime = 0
    }

    // TODO is start dead?
    start() {
        this.engageTime = this.duration
    }

    cancel() {
        this.engageTime = 0
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity
            this.engageTime -= deltaTime
        }
    }
}
