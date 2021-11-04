function random_i(min, max) {
    if (min == max) return min
    return Math.round(min + Math.random() * (max - min))
}

function random_r(range) {
    if (range.min === range.max) range.min
    return random_i(range.min, range.max)
}

function map(value, min1, max1, min2, max2) {
    if (min1 == max1 || min2 == max2) return min2
    return ((value - min1) / (max1 - min1)) * (max2 - min2) + min2
}

function map_r(value, range1, range2) {
    return map(value, range1.min, range1.max, range2.min, range2.max)
}