// initial function
function setup() {
    // physics
    gravity.reset()
    bounce.reset()

    // aiming
    aim_radius.reset()

    // balls
    ball_amount.reset()
    ball_radius.reset()

    // bubbles
    bubble_amount.reset()
    bubble_radius_range.reset()
    bubble_value_range.reset()

    // multipliers
    hits_multiplier.reset()
    streak_multiplier.reset()
    total_multiplier.reset()

    // screen buttons
    document.querySelector('#btn_to_upgrades').addEventListener('click', e => {
        if (!gameover) {
            update_upgrade_buttons()
            switch_to_screen(2)
        } else {
            switch_to_screen(0)
        }
    })

    document.querySelector('#btn_to_score').addEventListener('click', e => switch_to_screen(1))
    document.querySelector('#btn_next_round').addEventListener('click', e => switch_to_screen(0))

    document.querySelector('#btn_restart').addEventListener('click', e => location.reload())
    document.querySelector('#btn_continue').addEventListener('click', e => switch_to_screen(0))

    canvas.classList.add('canshoot')

    // get mouse position on mouse move
    canvas.addEventListener('mousemove', e => {
        let rect = e.target.getBoundingClientRect()
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
    })

    // shoot a ball on click
    canvas.addEventListener('click', e => {
        if (balls.some(b => b.shootable)) {
            balls.find(b => b.shootable).shoot(e)
            if (balls.filter(b => b.shootable).length == 0) canvas.classList.remove('canshoot')
        }
    })

    switch_to_screen(0)
}

// start a round
function start_round() {
    if (!gameover) round++

    ball_start = {
        x: width / 2,
        y: ball_radius.current * 4
    }

    hits = 0

    balls = []
    for (let i = 0; i < ball_amount.current; i++) balls.push(new Ball())
    bubbles = []

    canvas.classList.add('canshoot')

    generate_bubbles()

    requestAnimationFrame(render)
}

// insert score and add to points
function insert_score() {
    let hit_bonus = Math.round(hits_multiplier.current * hits)
    document.querySelector('#hits .value').innerText = hits
    document.querySelector('#hits .multiplier').innerText = 'x' + hits_multiplier.current
    document.querySelector('#hits .result').innerText = hit_bonus

    let longest_streak = [...balls].map(b => b.hits).sort().pop()
    let streak_bonus = Math.round(streak_multiplier.current * longest_streak)
    document.querySelector('#streak .value').innerText = longest_streak
    document.querySelector('#streak .multiplier').innerText = 'x' + streak_multiplier.current
    document.querySelector('#streak .result').innerText = streak_bonus

    let total = hit_bonus + streak_bonus
    let total_bonus = Math.round(total_multiplier.current * total)
    document.querySelector('#total .value').innerText = total
    document.querySelector('#total .multiplier').innerText = 'x' + total_multiplier.current
    document.querySelector('#total .result').innerText = total_bonus

    points += total_bonus

    document.querySelector('#points').innerText = points
}

// draw fps to screen
function draw_fps() {
    if (!last_timestamp) {
        last_timestamp = performance.now()
        fps = 0
        return
    }

    let delta = (performance.now() - last_timestamp) / 1000
    last_timestamp = performance.now()
    fps = Math.round(1 / delta)
    ctx.textAlign = 'left'
    ctx.fillStyle = 'white'
    ctx.font = '16px sans-serif'
    ctx.fillText(fps + " fps", 20, height - 20)
}

// draw amount of balls left
function draw_ball_count() {
    let balls_left = balls.filter(b => b.shootable).length
    ctx.beginPath()
    ctx.fillStyle = color_ball
    ctx.arc(30, 30, 10, 0, 2 * Math.PI)
    ctx.fill()

    ctx.textAlign = 'left'
    ctx.fillStyle = 'white'
    ctx.font = '16px sans-serif'
    ctx.fillText('x ' + balls_left, 55, 36)
}

// draw round number
function draw_round() {
    ctx.textAlign = 'right'
    ctx.fillStyle = 'white'
    ctx.font = '16px sans-serif'
    ctx.fillText('Round ' + round, width - 20, height - 20)
}

// draw the aiming line
function draw_aim() {
    let x = mouseX - ball_start.x
    let y = mouseY - ball_start.y
    let beta = y > 0 ? Math.atan(x / y) : Math.PI + Math.atan(x / y)
    let r = Math.max(Math.min(aim_radius.current, ((x ** 2) + (y ** 2)) ** .5), -aim_radius.current)

    ctx.beginPath()
    ctx.moveTo(ball_start.x, ball_start.y)
    ctx.lineTo(ball_start.x + Math.sin(beta) * r, ball_start.y + Math.cos(beta) * r)
    ctx.strokeStyle = color_aim
    ctx.lineWidth = ball_radius.current * 2
    ctx.lineCap = 'round'
    ctx.stroke()
}

// generate bubbles
function generate_bubbles() {
    for (let i = 0; i < bubble_amount.current; i++) bubbles.push(new Bubble())
}

// clear the screen
function clear() {
    ctx.fillStyle = color_background
    ctx.fillRect(0, 0, width, height)
}

// main rendering loop for screen=0
function render() {
    if (screen === 0) requestAnimationFrame(render)
    clear()
    if (balls.some(b => b.shootable)) {
        ctx.lineWidth = 2
        draw_aim()
    }
    balls.forEach(b => b.draw())
    bubbles.forEach(b => b.draw())
    draw_ball_count()
    if (show_fps) draw_fps()
    if (!gameover) draw_round()
}

// end a round
function end_round() {
    insert_score()
    switch_to_screen(1)
}

// disable buttons for maxed or unbuyable upgrades
function update_upgrade_buttons() {
    [gravity, bounce, aim_radius, ball_radius,
        ball_amount, bubble_amount, bubble_radius_range,
        bubble_value_range, hits_multiplier,
        streak_multiplier, total_multiplier].forEach(u => {
            u.btn_upgrade.setAttribute('disabled', u.maxed || u.upgrades[u.level + 1].price > points)
        })
}

// check if round is over
function check_done() {
    if (!balls.some(b => !b.dead) || !bubbles.some(b => b.value > 0)) end_round()
}

// check if game is over
function check_gameover() {
    // switch to game over screen if not gameover yet and all upgrades maxed
    if (![gravity, bounce, aim_radius, ball_radius,
        ball_amount, bubble_amount, bubble_radius_range,
        bubble_value_range, hits_multiplier,
        streak_multiplier, total_multiplier].some(u => u.maxed === false)) {
        document.querySelector('#rounds').innerText = round
        switch_to_screen(3)
        gameover = true
        document.querySelector('#btn_to_upgrades').innerText = 'Next Round'
    }
}

// 0: game, 1: score, 2: upgrade, 3: gameover
function switch_to_screen(n) {
    screen = n
    container.setAttribute('screen', n)
    if (n == 0) {
        start_round()
    }
}

// start
setup()