import SpriteSheet from './SpriteSheet.js'
import { loadImage } from './loaders.js'

export function loadMarioSprite() {
    return loadImage('/img/mario.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16)
        sprites.define('idle', 210, 0, 20, 20)
        return sprites
    })
}
