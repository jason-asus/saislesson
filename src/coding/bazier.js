/** settings */

let COLOR = [0, 0, 225]
let STROKE_WEIGHT = 2
let OFFSET_INC = 1
let OFFSET_INIT = [1, 2, 2, 4, 3, 6, 7, 1]

/** code */
let x1
let x2
let x3
let x4
let y1
let y2
let y3
let y4
let offset = 0

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
}

function draw() {
  // background(BACKGROUND_COLOR)
  strokeWeight(STROKE_WEIGHT / 50)
  stroke(COLOR[0], COLOR[1], COLOR[2])
  noFill()
  x1 = noise(offset + OFFSET_INIT[0]) * width
  x2 = noise(offset + OFFSET_INIT[1]) * width
  x3 = noise(offset + OFFSET_INIT[2]) * width
  x4 = noise(offset + OFFSET_INIT[3]) * width
  y1 = noise(offset + OFFSET_INIT[4]) * height
  y2 = noise(offset + OFFSET_INIT[5]) * height
  y3 = noise(offset + OFFSET_INIT[6]) * height
  y4 = noise(offset + OFFSET_INIT[7]) * height

  offset += OFFSET_INC / 1000

  bezier(x1, y1, x2, y2, x3, y3, x4, y4)
}
