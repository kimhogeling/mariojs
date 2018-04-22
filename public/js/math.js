
export class Matrix {
    constructor() {
        this.grid = []
    }

    forEach(fn) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                fn(value, x, y)
            })
        })
    }

    get(x, y) {
        return (this.grid[x] && this.grid[x][y]) || undefined
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = []
        }

        this.grid[x][y] = value
    }
}

export class Vec2 {
    constructor(x, y) {
        this.set(x, y)
    }

    set(x, y) {
        this.x = x
        this.y = y
    }
}
