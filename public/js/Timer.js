export default class Timer {
    constructor() {
        const fps = 60
        const deltaTime = 1 / fps

        let accumulatedTime = 0
        let lastTime = 0

        this.updateProxy = time => {
            accumulatedTime += (
                time - lastTime
            ) / 1000

            while (accumulatedTime > deltaTime) {
                // simply monkey patched this in main.js
                this.update(deltaTime)
                accumulatedTime -= deltaTime
            }

            lastTime = time

            this.enqueue()
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy)
    }

    start() {
        this.enqueue()
    }
}
