import TileResolver from './TileResolver.js'

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix)
    }

    /**
     * @param {Entity} entity
     */
    checkX({ pos, size, vel }) {
        if (vel.x === 0) {
            return
        }

        const x = vel.x > 0
            ? pos.x + size.x
            : pos.x

        this.tiles.searchByRange(
            x,
            x,
            pos.y,
            pos.y + size.y
        )
        .forEach(({ tile, x1, x2 }) => {
            if (!tile || tile.type !== 'ground') {
                return
            }

            if (vel.x > 0) {
                if ((
                    pos.x + size.x
                ) > x1) {
                    pos.x = x1 - size.x
                    vel.x = 0
                }
                return
            }

            if (vel.x < 0 && pos.x < x2) {
                pos.x = x2
                vel.x = 0
            }
        })
    }

    /**
     * @param {Entity} entity
     */
    checkY({ pos, size, vel }) {
        if (vel.y === 0) {
            return
        }

        const y = vel.y > 0
            ? pos.y + size.y
            : pos.y

        this.tiles.searchByRange(
            pos.x,
            pos.x + size.x,
            y,
            y
        )
        .forEach(({ tile, y1, y2 }) => {
            if (!tile || tile.type !== 'ground') {
                return
            }

            if (vel.y > 0) {
                if (pos.y + size.y > y1) {
                    pos.y = y1 - size.y
                    vel.y = 0
                }
                return
            }

            if (vel.y < 0 && pos.y < y2) {
                pos.y = y2
                vel.y = 0
            }
        })
    }
}
