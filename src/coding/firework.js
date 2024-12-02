/**
 *  You set your style values below
 */
const FIREWORK_NUMBER = 5
const GRAVITY = 0.05
const FRICTION_SPARKLE = 0.98
const FRICTION_SHOOT = 0.98
const SPARKLE_LIFE = 180
const SPARKLE_FLOWER = 20
const EXPLODE_SPEED = 3
const SHOOT_LENGTH = 8
const SPARKLE_LENGTH = 12
const WIND = 0

/** Keep the codes unchanged */

canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Shoot {
  constructor(
    friction,
    color = "rgba(0,0,0,0)",
    gravity = 0,
    x = 0,
    y = 0,
    vx = 0,
    vy = 0
  ) {
    this.friction = friction
    this.gravity = gravity
    this.color = color
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.tail = []
  }

  update() {
    this.vx *= this.friction
    this.vy = this.vy * this.friction + this.gravity

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
      ctx.arc(this.tail[i].x, this.tail[i].y, 0.3 * i, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    }
  }
}

class Sparkle {
  constructor(
    friction,
    wind = 0,
    gravity = 0,
    color = "rgba(0,0,0,0)",
    life = 120,
    x = 0,
    y = 0,
    vx = 0,
    vy = 0
  ) {
    this.friction = friction
    this.wind = wind
    this.gravity = gravity
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
      this.vy = this.vy * this.friction + this.gravity
      this.vx = this.vx * this.friction + this.wind

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
      this.color = "rgba(0,0,0,0)"
    }
  }

  draw() {
    ctx.fillStyle = this.color

    for (let i = 0; i < this.tail.length; i++) {
      ctx.beginPath()
      ctx.arc(this.tail[i].x, this.tail[i].y, 0.2 * i, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    }
  }
}

let shoots = []
for (let i = 0; i < FIREWORK_NUMBER; i++) {
  shoots.push(new Shoot(FRICTION_SHOOT))
}

let sparkles = []
for (let i = 0; i < FIREWORK_NUMBER; i++) {
  sparkles[i] = []
  for (let j = 0; j < SPARKLE_FLOWER; j++) {
    sparkles[i][j] = new Sparkle(FRICTION_SPARKLE, WIND)
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
        shoots[i].vy = -(10 * (Math.random() + 1))
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
      for (let j = 0; j < sparkles[i].length; j++) {
        sparkles[i][j].life = SPARKLE_LIFE
        sparkles[i][j].x = shoots[i].x
        sparkles[i][j].y = shoots[i].y
        sparkles[i][j].color = shoots[i].color
        sparkles[i][j].gravity = GRAVITY
        sparkles[i][j].vx =
          j % 3 == 1
            ? (EXPLODE_SPEED / 1.5) *
              Math.cos((Math.PI * 2 * j) / sparkles[i].length)
            : EXPLODE_SPEED * Math.cos((Math.PI * 2 * j) / sparkles[i].length)
        sparkles[i][j].vy =
          j % 3 == 1
            ? (EXPLODE_SPEED / 1.5) *
              Math.sin((Math.PI * 2 * j) / sparkles[i].length)
            : EXPLODE_SPEED * Math.sin((Math.PI * 2 * j) / sparkles[i].length)
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

    //

    // const v = (Math.random() * 2 + 1) * EXPLODE_SPEED
    // for (let j = 1; j < SPARKLE_FLOWER; j++) {
    //   sparkles.push(
    //     new Sparkle(
    //       shoots[i].x,
    //       shoots[i].y,
    //       v * Math.cos((Math.PI * 2 * j) / SPARKLE_FLOWER),
    //       v * Math.sin((Math.PI * 2 * j) / SPARKLE_FLOWER),
    //       FRICTION_SPARKLE,
    //       GRAVITY,
    //       shoots[i].color,
    //       SPARKLE_LIFE
    //     )
    //   )

    //   if (sparkles.length > FIREWORK_NUMBER * SPARKLE_FLOWER) {
    //     sparkles.shift()
    //     sparkles.shift()
    //   }
    // }
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
