let color_ball = '#FFFFFF'
let ball_start
let max_initial_speed = 20

class Ball extends Circle {
    constructor() {
        super(ball_start.x, ball_start.y, ball_radius.current)
        this.speed = new Vector(0, 0)
        this.shootable = true
        this.dead = false
        this.hits = 0
    }

    draw() {
        if (!this.dead) {
            ctx.beginPath()
            ctx.fillStyle = color_ball
            ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
            ctx.fill()
            this.move()
        }
    }

    shoot(e) {
        if (this.shootable && !this.dead) {
            let rect = e.target.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top

            this.shootable = false

            let x = mouseX - ball_start.x
            let y = mouseY - ball_start.y
            let beta = y > 0 ? Math.atan(x / y) : Math.PI + Math.atan(x / y)
            let r = Math.min(aim_radius.current, ((x ** 2) + (y ** 2)) ** .5)

            this.speed.x = map(Math.sin(beta) * r, -aim_radius.current, aim_radius.current, -max_initial_speed, max_initial_speed)
            this.speed.y = map(Math.cos(beta) * r, -aim_radius.current, aim_radius.current, -max_initial_speed, max_initial_speed)
        }
    }

    move() {
        if (this.shootable) {
            this.position.x = ball_start.x
            this.position.y = ball_start.y
            this.speed.x = 0
            this.speed.y = 0
        } else {
            this.position.x += this.speed.x
            this.position.y += this.speed.y
            this.speed.y += gravity.current
        }

        if (this.position.x > width - this.radius) {
            this.position.x = width - this.radius
            this.speed.x = -this.speed.x * bounce.current
        } else if (this.position.x < this.radius) {
            this.position.x = this.radius + 1
            this.speed.x = -this.speed.x * bounce.current
        }
        if (this.position.y < this.radius) {
            this.position.y = this.radius + 1
            this.speed.y = -this.speed.y * bounce.current
        } else if (this.position.y > height + (this.radius * 2)) {
            this.dead = true
            check_done()
        }
    }
}