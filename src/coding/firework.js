/**
 *  You set your style values below
 */
const FIREWORK_NUMBER = 8
const SHOOT_LENGTH = 50
const SPARKLE_LIFE = 300
const SPARKLE_FLOWER = 300
const EXPLODE_SPEED = 20
const SPARKLE_LENGTH = 20
const SPARKLE_HEAD = 2.5
const WIND = -0.02

/** Keep below unchanged */

const GRAVITY = 0.05
const FRICTION_SPARKLE = 0.96
const FRICTION_SHOOT = 0.98

canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Shoot {
  constructor(
    color = "rgba(0,0,0,0)",
    gravity = 0,
    x = 0,
    y = 0,
    vx = 0,
    vy = 0
  ) {
    this.gravity = gravity
    this.color = color
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.tail = []
  }

  update() {
    this.vx *= FRICTION_SHOOT
    this.vy = this.vy * FRICTION_SHOOT + this.gravity

    this.x += this.vx
    this.y += this.vy

    this.tail.push({ x: this.x, y: this.y })
    if (this.tail.length > SHOOT_LENGTH) {
      this.tail = this.tail.slice(-SHOOT_LENGTH)
    }
  }

  draw() {
    ctx.fillStyle = this.color

    for (let i = 0; i < this.tail.length; i++) {
      ctx.beginPath()
      ctx.arc(
        this.tail[i].x,
        this.tail[i].y,
        (1.2 * i) / SHOOT_LENGTH,
        0,
        2 * Math.PI
      )
      ctx.fill()
      ctx.closePath()
    }
  }
}

class Sparkle {
  constructor(
    gravity = 0,
    wind = 0,
    color = "rgba(0,0,0,0)",
    life = 120,
    x = 0,
    y = 0,
    vx = 0,
    vy = 0
  ) {
    this.gravity = gravity
    this.wind = wind
    this.color = color
    this.life = life
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.tail = []
  }

  update() {
    this.life -= 1
    if (this.life > 0) {
      this.vy = this.vy * FRICTION_SPARKLE + this.gravity
      this.vx = this.vx * FRICTION_SPARKLE + this.wind

      this.x += this.vx
      this.y += this.vy

      this.tail.push({ x: this.x, y: this.y })
      if (this.tail.length > SPARKLE_LENGTH) {
        this.tail = this.tail.slice(-SPARKLE_LENGTH)
      }
    } else {
      this.x = 0
      this.y = 0
      this.vx = 0
      this.vy = 0
      this.gravity = 0
      this.wind = 0
      this.color = "rgba(0,0,0,0)"
    }
  }

  draw() {
    ctx.fillStyle = this.color

    for (let i = 0; i < this.tail.length; i++) {
      ctx.beginPath()
      ctx.arc(
        this.tail[i].x,
        this.tail[i].y,
        (SPARKLE_HEAD * i) / SPARKLE_LENGTH,
        0,
        2 * Math.PI
      )
      ctx.fill()
      ctx.closePath()
    }
  }
}

let shoots = []
for (let i = 0; i < FIREWORK_NUMBER; i++) {
  shoots.push(new Shoot())
}

let sparkles = []
for (let i = 0; i < FIREWORK_NUMBER; i++) {
  sparkles[i] = []
  for (let j = 0; j < SPARKLE_FLOWER; j++) {
    sparkles[i][j] = new Sparkle()
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (Math.random() < 0.1) {
    for (let i = 0; i < shoots.length; i++) {
      if (shoots[i].color === "rgba(0,0,0,0)") {
        let vx = 3
        const r = Math.random()
        if (Math.floor(r * 10) % 2 == 1) vx = r * vx * -1

        shoots[i].gravity = GRAVITY
        shoots[i].x = Math.random() * canvas.width
        shoots[i].y = canvas.height
        shoots[i].vx = vx
        shoots[i].vy = -(9.6 * (Math.random() + 1))
        shoots[i].color = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
          Math.random() * 255
        )},${Math.floor(Math.random() * 255)},0.8)`
      }
    }
  }

  for (let i = 0; i < shoots.length; i++) {
    shoots[i].update()
    shoots[i].draw()

    if (shoots[i].vy > 0) {
      const explodeSpeed = (EXPLODE_SPEED / 10) * (Math.random() + 2)
      for (let j = 0; j < sparkles[i].length; j++) {
        sparkles[i][j].life = SPARKLE_LIFE
        sparkles[i][j].x = shoots[i].x
        sparkles[i][j].y = shoots[i].y
        sparkles[i][j].color = shoots[i].color
        sparkles[i][j].gravity = GRAVITY
        sparkles[i][j].wind = WIND
        sparkles[i][j].vx =
          j % 3 == 1
            ? (explodeSpeed / 1.8) *
              Math.cos((Math.PI * 2 * j) / sparkles[i].length)
            : explodeSpeed * Math.cos((Math.PI * 2 * j) / sparkles[i].length)
        sparkles[i][j].vy =
          j % 3 == 1
            ? (explodeSpeed / 1.8) *
              Math.sin((Math.PI * 2 * j) / sparkles[i].length)
            : explodeSpeed * Math.sin((Math.PI * 2 * j) / sparkles[i].length)
      }
      //
      shoots[i].color = "rgba(0,0,0,0)"
      shoots[i].gravity = 0
      shoots[i].x = 0
      shoots[i].y = 0
      shoots[i].vx = 0
      shoots[i].vy = 0
      shoots[i].tail = []
    }
  }

  for (let i = 0; i < sparkles.length; i++) {
    for (let j = 0; j < sparkles[i].length; j++) {
      sparkles[i][j].update()
      sparkles[i][j].draw()
    }
  }

  requestAnimationFrame(animate)
}

animate() // Launch
