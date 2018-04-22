export function createBackgroundLayer(level, sprites) {
    const { tiles } = level
    const resolver = level.tileCollider.tiles

    const buffer = document.createElement('canvas')
    buffer.width = 256 + 16
    buffer.height = 240

    const context = buffer.getContext('2d')

    let startIndex
    let endIndex

    function redraw(drawFrom, drawTo) {
        if (drawFrom === startIndex && drawTo === endIndex) {
            return
        }

        startIndex = drawFrom
        endIndex = drawTo

        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x]
            if (col) {
                // TODO don't make functions in loops
                col.forEach((tile, y) => {
                    sprites.drawTile(tile.name, context, x - startIndex, y)
                })
            }
        }
    }

    /**
     * @param {context} ctx
     */
    return function drawBackgroundLayer(ctx, cam) {
        const drawWidth = resolver.toIndex(cam.size.x)
        const drawFrom = resolver.toIndex(cam.pos.x)
        const drawTo = drawFrom + drawWidth

        redraw(drawFrom, drawTo)

        ctx.drawImage(
            buffer,
            -cam.pos.x % 16,
            -cam.pos.y
        )
    }
}

export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas')

    // for now, max width and height of 64
    spriteBuffer.width = width
    spriteBuffer.height = height

    const spriteBufferContext = spriteBuffer.getContext('2d')

    return function drawSpriteLayer(context, cam) {
        entities.forEach(
            entity => {
                spriteBufferContext.clearRect(0, 0, width, height)

                entity.draw(spriteBufferContext)

                context.drawImage(
                    spriteBuffer,
                    entity.pos.x - cam.pos.x,
                    entity.pos.y - cam.pos.y
                )
            }
        )
    }
}

export function createCollisionLayer(level) {
    let resolvedTiles = []

    const tileResolver = level.tileCollider.tiles
    const { tileSize } = tileResolver

    const getByIndexOriginal = tileResolver.getByIndex
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y })
        // using .call to bind `this` to tileResolver
        return getByIndexOriginal.call(tileResolver, x, y)
    }

    return function drawCollision(context, cam) {
        context.strokeStyle = 'blue'
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath()
            context.rect(
                (x * tileSize) - cam.pos.x,
                (y * tileSize) - cam.pos.y,
                tileSize,
                tileSize
            )
            context.stroke()
        })

        context.strokeStyle = 'red'
        level.entities.forEach(({ pos, size }) => {
            context.beginPath()
            context.rect(
                pos.x - cam.pos.x,
                pos.y - cam.pos.y,
                size.x,
                size.y
            )
            context.stroke()
        })

        resolvedTiles = []
    }
}

/**
 * @param cameraToDraw this is not the camera that is "watching"
 * @returns {drawCameraRect}
 */
export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple'
        context.beginPath()
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y
        )
        context.stroke()
    }
}
