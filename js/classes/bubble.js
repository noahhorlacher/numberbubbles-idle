let bubble_colors = [
    '#1B998B',
    '#FFC857',
    '#FFA9E7',
    '#BBBDF6'
]
let bubble_field_distance = 20

class Bubble extends Circle {
    constructor() {
        let value = random_r(bubble_value_range.current)
        let radius = map_r(value, bubble_value_range.current, bubble_radius_range.current)
        let x = random_i(radius, width - radius)
        let y = random_i((ball_radius.current + ball_start.y) + radius + bubble_field_distance, height - radius)
        super(x, y, radius)
        this.value = value
        this.color = bubble_colors[random_i(0, bubble_colors.length)]
    }

    draw() {
        if (this.value > 0) {
            ctx.beginPath()
            ctx.strokeStyle = this.color
            ctx.lineWidth = 2
            ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
            ctx.stroke()
            ctx.fillStyle = this.color
            ctx.font = (this.radius * .8) + 'px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(this.value, this.position.x, this.position.y)
            balls.forEach(b => this.check_ball_collision(b))
        }
    }

    check_ball_collision(ball) {
        let distance = Math.sqrt(Math.pow(ball.position.x - this.position.x, 2) + Math.pow(ball.position.y - this.position.y, 2))
        if (distance < ball.radius + this.radius) {
            let overlap = ball.radius + this.radius - distance
            let angle = Math.atan2((ball.position.y - this.position.y), (ball.position.x - this.position.x))
            ball.position.rotate(true, angle)
            this.position.rotate(true, angle)
            ball.speed.rotate(true, angle)

            if (ball.position.x > this.position.x) ball.position.x += overlap
            else ball.position.x -= overlap

            ball.speed.x = -ball.speed.x * bounce.current

            ball.position.rotate(false, angle)
            this.position.rotate(false, angle)
            ball.speed.rotate(false, angle)

            hits++
            ball.hits++

            this.radius = map_r(--this.value, bubble_value_range.current, bubble_radius_range.current)
        }
    }
}