// canvas dimensions
let width = 500, height = 730

// background color
let color_background = '#2D3047'

// color of aiming line (rgba)
let color_aim = '#FFFFFF66'

// current screen
// 0: game, 1: score, 2: upgrades
let screen = 0

// mouse position
let mouseX, mouseY

let gameover = false

// bubbles of this round
let bubbles

// fps for debugging
let show_fps = false, fps, last_timestamp

// points to spend on updates
let points = 0

// keep track of rounds
let round = 0

// physics
let gravity = new Upgradeable(
    'Gravity',
    new Upgrade(.4, 0),
    new Upgrade(.35, 10 ** 2),
    new Upgrade(.3, 1000),
    new Upgrade(.25, 10000)
)

let bounce = new Upgradeable(
    'Bounce',
    new Upgrade(.8, 0),
    new Upgrade(.85, 10 ** 3),
    new Upgrade(.9, 10 ** 6)
)

// aiming
let aim_radius = new Upgradeable(
    'Aim Radius',
    new Upgrade(80, 0),
    new Upgrade(110, 10 ** 2),
    new Upgrade(150, 10 ** 3),
    new Upgrade(200, 10 ** 4),
    new Upgrade(260, 10 ** 5),
    new Upgrade(320, 10 ** 6)
)

// balls
let balls
let ball_radius = new Upgradeable(
    'Ball Size',
    new Upgrade(8, 0),
    new Upgrade(10, 10),
    new Upgrade(12, 1000),
    new Upgrade(14, 100000)
)
let ball_amount = new Upgradeable(
    'Amount of Balls',
    new Upgrade(1, 0),
    new Upgrade(2, 10),
    new Upgrade(3, 100),
    new Upgrade(4, 200),
    new Upgrade(5, 300),
    new Upgrade(6, 500),
    new Upgrade(7, 750),
    new Upgrade(8, 1000),
    new Upgrade(9, 1500),
    new Upgrade(10, 2000),
    new Upgrade(11, 3000),
    new Upgrade(12, 5000),
    new Upgrade(13, 8000),
    new Upgrade(14, 15000),
    new Upgrade(15, 22000),
    new Upgrade(16, 40000),
    new Upgrade(17, 70000),
    new Upgrade(18, 100000),
    new Upgrade(19, 200000),
    new Upgrade(20, 400000),
    new Upgrade(21, 600000),
    new Upgrade(22, 1000000)
)

// bubbles
let bubble_amount = new Upgradeable(
    'Amount of Bubbles',
    new Upgrade(2 ** 0, 0),
    new Upgrade(2 ** 1, 10),
    new Upgrade(2 ** 2, 100),
    new Upgrade(2 ** 3, 500),
    new Upgrade(2 ** 4, 10000),
    new Upgrade(2 ** 5, 50000),
    new Upgrade(2 ** 6, 100000),
    new Upgrade(2 ** 7, 500000),
    new Upgrade(2 ** 8, 1000000),
    new Upgrade(2 ** 9, 5000000)
)
let bubble_radius_range = new Upgradeable(
    'Bubble Max. Size',
    new Upgrade(new Range(20, 20), 0),
    new Upgrade(new Range(20, 25), 10),
    new Upgrade(new Range(20, 30), 1000),
    new Upgrade(new Range(20, 35), 10000),
    new Upgrade(new Range(20, 40), 100000),
    new Upgrade(new Range(20, 45), 1000000)
)
let bubble_value_range = new Upgradeable(
    'Bubble Max. Value',
    new Upgrade(new Range(1, 2 ** 1), 0),
    new Upgrade(new Range(1, 2 ** 2), 10),
    new Upgrade(new Range(1, 2 ** 3), 100),
    new Upgrade(new Range(1, 2 ** 4), 10000),
    new Upgrade(new Range(1, 2 ** 5), 100000)
)

// multipliers
let hits_multiplier = new Upgradeable(
    'Hit Multipliers',
    new Upgrade(2 ** 0, 0),
    new Upgrade(2 ** 1, 10 ** 1),
    new Upgrade(2 ** 2, 10 ** 2),
    new Upgrade(2 ** 3, 10 ** 3),
    new Upgrade(2 ** 4, 10 ** 4),
    new Upgrade(2 ** 5, 10 ** 5),
    new Upgrade(2 ** 6, 10 ** 6),
    new Upgrade(2 ** 7, 10 ** 7)
)
let streak_multiplier = new Upgradeable(
    'Streak Multiplier',
    new Upgrade(2 ** 0, 0),
    new Upgrade(2 ** 1, 10 ** 1),
    new Upgrade(2 ** 2, 10 ** 2),
    new Upgrade(2 ** 3, 10 ** 3),
    new Upgrade(2 ** 4, 10 ** 4),
    new Upgrade(2 ** 5, 10 ** 5),
    new Upgrade(2 ** 6, 10 ** 6),
    new Upgrade(2 ** 7, 10 ** 7)
)
let total_multiplier = new Upgradeable(
    'Total Multiplier',
    new Upgrade(2 ** 0, 0),
    new Upgrade(2 ** 1, 10 ** 1),
    new Upgrade(2 ** 2, 10 ** 2),
    new Upgrade(2 ** 3, 10 ** 3),
    new Upgrade(2 ** 4, 10 ** 4),
    new Upgrade(2 ** 5, 10 ** 5),
    new Upgrade(2 ** 6, 10 ** 6),
    new Upgrade(2 ** 7, 10 ** 7)
)