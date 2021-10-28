const container = document.querySelector('game')
const canvas = document.createElement('canvas')
canvas.width = width
canvas.height = height
const ctx = canvas.getContext('2d')
container.append(canvas)
document.querySelector('screen[value="1"]').style.width = width + 'px'
document.querySelector('screen[value="1"]').style.height = height + 'px'
document.querySelector('screen[value="2"]').style.width = width + 'px'
document.querySelector('screen[value="2"]').style.height = height + 'px'