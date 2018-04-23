export function createAnim(frames, frameLen) {
    return function resolveFrame(distance) {
        const frameIndex = Math.floor(distance / frameLen) % frames.length
        // frame name
        return frames[frameIndex]
    }
}
