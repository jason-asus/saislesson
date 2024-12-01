/**
 *  You set your style values below
 */
// const FIRST_LINE = "Slow and steady"
// const SECOND_LINE = "win the game"
// const RADIUS = 50
// const PSIZE = 3
// const WORD_SIZE = 14
// const STROKE_COLOR = "255, 20, 20"
// const DOT_COLOR = "8, 1, 221"

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

// ctx.strokeRect(0, 0, 100, 100)
// ctx.fillText(FIRST_LINE, 0, WORD_SIZE)
// ctx.fillText(SECOND_LINE, 0, WORD_SIZE * 2)
// const imageData = ctx.getImageData(0, 0, 2000, 2000)
// const my_gradient = ctx.createLinearGradient(0, 0, 170, 0)
// my_gradient.addColorStop(0, "white")
// my_gradient.addColorStop(1, "#beec40d2")

class Particle {
  constructor(x, y) {
    this.position = { x, y }
    this.velocity = { x: 0, y: 0 }
    this.acceleration = { x: 0, y: 0 }
  }
  applyForce(force) {
    this.acceleration.add(force)
  }

  update() {
    this.velocity.x += this.acceleration.x
    this.velocity.y += this.acceleration.y

    // this.position.add(this.velocity)
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // this.acceleration = { x: 0, y: 0 }
  }

  drawParticle() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.ellipse(
      this.position.x,
      this.position.y,
      5,
      5,
      Math.PI / 4,
      0,
      2 * Math.PI
    )
    ctx.closePath()
    ctx.fill()
  }
  particleMotion() {
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    let cosTheta = dx / distance
    let sinTheta = dy / distance
    let speedOfMotion = 1 - distance / mouse.radius
    let directionX = cosTheta * speedOfMotion * this.density
    let directionY = sinTheta * speedOfMotion * this.density

    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
      this.interaction = true
    } else {
      this.interaction = false
      if (this.x !== this.originalX) {
        let dx = this.x - this.originalX
        this.x -= dx / 10
      }
      if (this.y !== this.originalY) {
        let dy = this.y - this.originalY
        this.y -= dy / 10
      }
    }
  }
}

const firework = new Particle(Math.random() * canvas.width, canvas.height)
firework.velocity.y = -2
firework.acceleration.y = -1

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  //
  firework.update()
  firework.drawParticle()

  requestAnimationFrame(animate)
}

animate()
