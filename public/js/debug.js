function moveEntity(entity, x, y) {
    entity.vel.set(0, 0)
    entity.pos.set(x, y)
}

function moveCamera(cam, x = false, y = false) {
    if (x) {
        cam.pos.x += x
    }
    if (y) {
        cam.pos.y += y
    }
}

/**
 * @param {HTMLElement} canvas
 * @param {Entity} entity
 * @param {Camera} cam
 */
export function setupMouseControl(canvas, entity, cam) {
    // for time travel
    let lastEvent

    canvas.addEventListener('contextmenu', event => event.preventDefault());

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                moveEntity(
                    entity,
                    event.offsetX + cam.pos.x,
                    event.offsetY + cam.pos.y
                )
            }
            if (
                event.buttons === 2
                && lastEvent
                && lastEvent.buttons === 2
                && lastEvent.type === 'mousemove'
            ) {
                moveCamera(
                    cam,
                    event.offsetX - lastEvent.offsetX
                )
            }

            lastEvent = event
        })
    })
}
