// canvas dimensions
let width = 450, height = 730

// points to spend on updates
let points
let initial_points = 1000000

// keep track of rounds
let round

// physics
let gravity = new Upgradeable(
    'Gravity',
    new Upgrade(.3, 0),
    new Upgrade(.25, 10),
    new Upgrade(.2, 20),
    new Upgrade(.15, 30),
    new Upgrade(.1, 40),
    new Upgrade(.05, 50)
)

let bounce = new Upgradeable(
    'Bounce',
    new Upgrade(.8, 0),
    new Upgrade(.85, 10),
    new Upgrade(.9, 20),
    new Upgrade(.95, 30)
)

// aiming
let aim_radius = new Upgradeable(
    'Aim Radius',
    new Upgrade(80, 0),
    new Upgrade(110, 10),
    new Upgrade(150, 20),
    new Upgrade(200, 30),
    new Upgrade(260, 40),
    new Upgrade(320, 50)
)

// balls
let balls
let ball_radius = new Upgradeable(
    'Ball Size',
    new Upgrade(5, 0),
    new Upgrade(7, 10),
    new Upgrade(10, 20),
    new Upgrade(14, 30),
    new Upgrade(20, 40),
    new Upgrade(28, 50),
    new Upgrade(36, 60),
    new Upgrade(45, 70),
    new Upgrade(60, 80)
)
let ball_amount = new Upgradeable(
    'Amount of Balls',
    new Upgrade(1, 0),
    new Upgrade(2, 10),
    new Upgrade(3, 20),
    new Upgrade(4, 30),
    new Upgrade(5, 40),
    new Upgrade(6, 50),
    new Upgrade(7, 60),
    new Upgrade(8, 70),
    new Upgrade(9, 80),
    new Upgrade(10, 90),
    new Upgrade(11, 100),
    new Upgrade(12, 200),
    new Upgrade(13, 60),
    new Upgrade(14, 70),
    new Upgrade(15, 80),
    new Upgrade(16, 90),
    new Upgrade(17, 40),
    new Upgrade(18, 50),
    new Upgrade(19, 60),
    new Upgrade(20, 70),
    new Upgrade(21, 80),
    new Upgrade(22, 90),
    new Upgrade(23, 90)
)

// bubbles
let bubble_amount = new Upgradeable(
    'Amount of Bubbles',
    new Upgrade(2 ** 0, 0),
    new Upgrade(2 ** 1, 10),
    new Upgrade(2 ** 2, 20),
    new Upgrade(2 ** 3, 30),
    new Upgrade(2 ** 4, 40),
    new Upgrade(2 ** 5, 50),
    new Upgrade(2 ** 6, 60),
    new Upgrade(2 ** 7, 70),
    new Upgrade(2 ** 8, 70),
    new Upgrade(2 ** 9, 70),
    new Upgrade(2 ** 10, 70)
)
let bubble_radius_range = new Upgradeable(
    'Bubble Max. Size',
    new Upgrade(new Range(15, 15), 0),
    new Upgrade(new Range(15, 20), 10),
    new Upgrade(new Range(15, 30), 20),
    new Upgrade(new Range(15, 45), 30),
    new Upgrade(new Range(15, 60), 40),
    new Upgrade(new Range(15, 80), 50)
)
let bubble_value_range = new Upgradeable(
    'Bubble Max. Value',
    new Upgrade(new Range(1, 1), 0),
    new Upgrade(new Range(1, 2), 10),
    new Upgrade(new Range(1, 4), 20),
    new Upgrade(new Range(1, 8), 30),
    new Upgrade(new Range(1, 16), 40),
    new Upgrade(new Range(1, 32), 50)
)

// multipliers
let hits_multiplier = new Upgradeable(
    'Hit Multipliers',
    new Upgrade(1, 0),
    new Upgrade(2, 10),
    new Upgrade(4, 20),
    new Upgrade(8, 30),
    new Upgrade(16, 40),
    new Upgrade(32, 50),
    new Upgrade(64, 100),
    new Upgrade(128, 200)
)
let streak_multiplier = new Upgradeable(
    'Streak Multiplier',
    new Upgrade(1, 0),
    new Upgrade(2, 10),
    new Upgrade(4, 20),
    new Upgrade(8, 30),
    new Upgrade(16, 40),
    new Upgrade(32, 50),
    new Upgrade(64, 100),
    new Upgrade(128, 200)
)
let balls_left_multiplier = new Upgradeable(
    'Balls Left Multiplier',
    new Upgrade(1, 0),
    new Upgrade(2, 10),
    new Upgrade(4, 20),
    new Upgrade(8, 30),
    new Upgrade(16, 40),
    new Upgrade(32, 50),
    new Upgrade(64, 100),
    new Upgrade(128, 200)
)
let total_multiplier = new Upgradeable(
    'Total Multiplier',
    new Upgrade(1, 0),
    new Upgrade(2, 10),
    new Upgrade(4, 20),
    new Upgrade(8, 30),
    new Upgrade(16, 40),
    new Upgrade(32, 50),
    new Upgrade(64, 100),
    new Upgrade(128, 200)
)