export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix
        this.tileSize = tileSize
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize)
    }

    getByIndex(indexX, indexY) {
        return {
            tile: this.matrix.get(indexX, indexY),
            y1: indexY * this.tileSize,
            y2: indexY * this.tileSize + this.tileSize,
        }
    }

    matchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        )
    }
}
