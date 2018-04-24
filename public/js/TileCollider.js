import TileResolver from './TileResolver.js'
import { Sides } from './Entity.js'

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
    checkY(entity) {
        if (entity.vel.y === 0) {
            return
        }

        const y = entity.vel.y > 0
            ? entity.pos.y + entity.size.y
            : entity.pos.y

        this.tiles.searchByRange(
            entity.pos.x,
            entity.pos.x + entity.size.x,
            y,
            y
        )
        .forEach(({ tile, y1, y2 }) => {
            if (!tile || tile.type !== 'ground') {
                return
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > y1) {
                    entity.pos.y = y1 - entity.size.y
                    entity.vel.y = 0

                    entity.obstruct(Sides.BOTTOM)
                }
                return
            }

            if (entity.vel.y < 0 && entity.pos.y < y2) {
                entity.pos.y = y2
                entity.vel.y = 0

                entity.obstruct(Sides.TOP)
            }
        })
    }
}
