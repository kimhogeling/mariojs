export class Trait {
    constructor(name) {
        this.NAME = name
    }

    update() {
        console.warn('Unhandled update call in Trait')
    }
}
