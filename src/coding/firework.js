/**
 *  You set your style values below
 */
const FIREWORK_NUMBER = 5
const GRAVITY = 0.2
const FRICTION = 0.99

canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particleArray = []

ctx.fillStyle = "White"
// ctx.font = `oblique 500 ${WORD_SIZE}px sans-serif`
ctx.strokeStyle = "white"
ctx.stroke = 255
ctx.strokeWeight = 4

class Shoot {
  constructor(x, y, vx, vy, friction, gravity) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.friction = friction
    this.gravity = gravity
    this.tail = []
  }

  update() {
    this.vx *= this.friction
    this.vy = this.vy * this.friction + this.gravity

    this.x += this.vx
    this.y += this.vy

    this.tail.push({ x: this.x, y: this.y })
    if (this.tail.length > 4) this.tail.shift()
  }

  draw() {
    ctx.fillStyle = "yellow"
    ctx.beginPath()

    for (let i = 0; i < this.tail.length; i++) {
      ctx.arc(this.tail[i].x, this.tail[i].y, 0.8 * i, 0, 2 * Math.PI)
    }

    ctx.closePath()
    ctx.fill()
  }
}

class Sparkle {
  constructor(x, y, vx, vy, friction, gravity) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.friction = friction
    this.gravity = gravity
    this.tail = []
  }

  update() {
    this.vx *= this.friction
    this.vy = this.vy * this.friction + this.gravity

    this.x += this.vx
    this.y += this.vy

    this.tail.push({ x: this.x, y: this.y })
    if (this.tail.length > 4) this.tail.shift()
  }

  draw() {
    ctx.fillStyle = "red"
    ctx.beginPath()

    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI) //

    for (let i = 0; i < this.tail.length; i++) {
      ctx.arc(this.x, this.y, 5 * i, 0, 2 * Math.PI)
    }

    ctx.closePath()
    ctx.fill()
  }
}

let shoots = []

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // clear particles that have droped out of the bottom line
  shoots = shoots.filter((f) => {
    return f.y <= canvas.height && f.y > 0 && f.vy < 0.05
  })

  if (Math.random() < FIREWORK_NUMBER / 100) {
    let vx = 10 * Math.random()
    if (vx % 2 == 1) vx * -1

    let vy = -(10 * Math.random() + 15)

    const shoot = new Shoot(
      Math.random() * canvas.width,
      canvas.height,
      vx,
      vy,
      FRICTION,
      GRAVITY
    )

    shoots.push(shoot)
  }

  //
  let sparkle
  for (let i = 0; i < shoots.length; i++) {
    shoots[i].update()
    shoots[i].draw()
    if (shoots[i].vy > 0) {
      console.log(shoots[i].vy) //ttt

      sparkle = new Sparkle(
        // shoots[i].x,
        // shoots[i].y,
        // Math.random() * 3,
        // Math.random() * 3,
        300,
        300,
        1,
        1,
        FRICTION,
        GRAVITY
      )
      console.log("sparkle.x", sparkle.x) //
    }
  }

  if (sparkle) {
    console.log("sparkle.y", sparkle.y)
    sparkle.update()
    sparkle.draw()
  }

  requestAnimationFrame(animate)
}

animate()

/**
 * f  friction
 * v  velocity
 * g  gravity
 *
 */
