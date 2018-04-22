export default class Compositor {
    constructor() {
        this.layers = []
    }

    draw(context, cam) {
        this.layers.forEach(layer => layer(context, cam))
    }
}
