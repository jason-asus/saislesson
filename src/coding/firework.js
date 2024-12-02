/**
 *  You set your style values below
 */
const FIREWORK_NUMBER = 50
const GRAVITY = 0.1
const FRICTION = 0.99
const FRICTION_SHOOT = 0.98
const SPARKLE_LIFE = 200
const SPARKLE_FLOWER = 15
const EXPLODE_SPEED = 2

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

const SHOOT_LENGTH = 4
class Shoot {
  constructor(x, y, vx, vy, friction, gravity, color) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.friction = friction
    this.gravity = gravity
    this.tail = []
    this.color = color
  }

  update() {
    this.vx *= this.friction
    this.vy = this.vy * this.friction + this.gravity

    this.x += this.vx
    this.y += this.vy

    this.tail.push({ x: this.x, y: this.y })
    if (this.tail.length > SHOOT_LENGTH) this.tail.shift()
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()

    for (let i = 0; i < this.tail.length; i++) {
      ctx.arc(this.tail[i].x, this.tail[i].y, 0.8 * i, 0, 2 * Math.PI)
    }

    ctx.closePath()
    ctx.fill()
  }
}

const SPARKLE_LENGTH = 10
class Sparkle {
  constructor(x, y, vx, vy, friction, gravity, color) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.friction = friction
    this.gravity = gravity
    this.tail = []
    this.life = SPARKLE_LIFE
    this.color = color
  }

  update() {
    this.life -= 1
    if (this.life > 0) {
      this.vy = this.vy * this.friction + this.gravity
      this.vx = this.vx * this.friction

      this.x += this.vx
      this.y += this.vy

      this.tail.push({ x: this.x, y: this.y })
      if (this.tail.length > SPARKLE_LENGTH) this.tail.shift()
    } else {
      this.tail = []
    }
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()

    for (let i = 0; i < this.tail.length; i++) {
      ctx.arc(this.tail[i].x, this.tail[i].y, 0.2 * i, 0, 2 * Math.PI)
    }

    ctx.closePath()
    ctx.fill()
  }
}

let shoots = []
let sparkles = []

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // clear particles that have droped out of the bottom line
  shoots = shoots.filter((f) => {
    return f.y <= canvas.height && f.y > 0 && f.vy < GRAVITY
  })

  if (Math.random() < FIREWORK_NUMBER / 100) {
    let vx = 5 * Math.random()
    if (vx % 2 == 1) vx * -1

    let vy = -(10 * (Math.random() + 1))

    const shoot = new Shoot(
      Math.random() * canvas.width,
      canvas.height,
      vx,
      vy,
      FRICTION_SHOOT,
      GRAVITY,
      `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)})`
    )

    shoots.push(shoot)
  }

  // sparkles

  for (let i = 0; i < shoots.length; i++) {
    shoots[i].update()
    shoots[i].draw()
    if (shoots[i].vy > 0 && shoots[i].vy < GRAVITY) {
      const v = (Math.random() + 1) * EXPLODE_SPEED
      for (let j = 1; j < SPARKLE_FLOWER; j++) {
        sparkles.push(
          new Sparkle(
            shoots[i].x,
            shoots[i].y,
            v * Math.cos((Math.PI * 2 * j) / SPARKLE_FLOWER),
            v * Math.sin((Math.PI * 2 * j) / SPARKLE_FLOWER),
            FRICTION,
            GRAVITY,
            shoots[i].color
          )
        )
        // limit 100 sparkles
        if (sparkles.length > 100) {
          sparkles.shift()
        }
      }
    }
  }

  for (let i = 0; i < sparkles.length; i++) {
    sparkles[i].update()
    sparkles[i].draw()
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
