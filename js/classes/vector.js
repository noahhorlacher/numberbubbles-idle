class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    rotate(forward, angle) {
        if (forward) {
            let x = this.x * Math.cos(angle) + this.y * Math.sin(angle)
            let y = this.y * Math.cos(angle) - this.x * Math.sin(angle)
            this.x = x
            this.y = y
        } else {
            let x = this.x * Math.cos(angle) - this.y * Math.sin(angle)
            let y = this.y * Math.cos(angle) + this.x * Math.sin(angle)
            this.x = x
            this.y = y
        }
    }
}