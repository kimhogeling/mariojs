export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix
        this.tileSize = tileSize
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize)
    }

    /**
     * Calculate the range of all colliding tiles
     * @param pos1
     * @param pos2
     * @returns {Array}
     */
    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize
        const range = []
        let pos = pos1

        // TODO cleanup by replacing this loop with help of % operator
        do {
            range.push(this.toIndex(pos))
            pos += this.tileSize
        } while (pos < pMax)

        return range
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY)
        let x1 = 0
        let x2 = 0
        let y1 = 0
        let y2 = 0

        if (tile) {
            x1 = indexX * this.tileSize
            x2 = x1 + this.tileSize
            y1 = indexY * this.tileSize
            y2 = y1 + this.tileSize
        }

        return {
            tile,
            x1,
            x2,
            y1,
            y2
        }
    }

    // TODO is searchByPosition dead?
    searchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        )
    }

    searchByRange(x1, x2, y1, y2) {
        // TODO clean this up with filter and map?
        const matches = []

        this.toIndexRange(x1, x2)
        .forEach(
            iX => this.toIndexRange(y1, y2)
            .forEach(
                iY => {
                    const match = this.getByIndex(iX, iY)
                    if (match) {
                        matches.push(match)
                    }
                }
            )
        )
        return matches
    }
}
