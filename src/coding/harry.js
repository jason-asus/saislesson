/** settings */
let BACKGROUND_COLOR = [200, 150, 227, 150]
let SIZE = 2
let WORDS = "MERRY CHRISTMAS AND HAPPY NEW YEAR!"
let STROKE = false
let GRAIN = 150

/** code */
let img
let cols, rows
let sizes = []
function preload() {
  img = loadImage("harry.jpg")
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  background(220)
  textSize(30)
  text(WORDS, width / 2 + 30, 35)

  img.resize(width / 2, 0)
  cols = width / SIZE
  rows = width / SIZE
  for (let i = 0; i < cols; i++) {
    sizes[i] = []
    for (let j = 0; j < rows; j++) {
      sizes[i][j] = 0
    }
  }
  rectMode(CENTER)

  noLoop()
}

function draw() {
  background(BACKGROUND_COLOR)
  fill(255, 255, 255, 150)
  image(img, 0, 0)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let c = img.get(i * SIZE, j * SIZE)
      sizes[i][j] = map(brightness(c), 0, 100, (SIZE * GRAIN) / 100, 0)
      fill(c)
      if (!STROKE) {
        noStroke()
      }

      rect(
        width / 2 + i * SIZE - SIZE / 2,
        j * SIZE - SIZE / 2,
        sizes[i][j],
        sizes[i][j]
      )
    }
  }
}
