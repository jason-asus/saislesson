// You can personize your bubbles by setting the values below
const settings = {
  canvas: null,
  radius: 30,
  radiusAdd: 40,
  bubbleNumber: 50,
  color: 200,
  velocity:50,
}
// SETTINGS END HERE

const canvas = document.getElementById("cnvs")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")
settings.canvas = canvas

ctx.strokeStyle = "black"

class Particle {
  constructor(effect) {
    this.effect = effect
    const { width, height, radiusAdd, radius, velocity } = effect // into local short name
    this.radius = Math.random() * radiusAdd + radius
    this.x = this.radius + Math.random() * (width - this.radius * 2)
    this.y = this.radius + Math.random() * (height - this.radius * 2)
    this.vx = Math.random() * velocity
    this.vy = Math.random() * velocity
  }

  draw(context) {
    context.fillStyle = "hsl(" + (this.effect.color % 360) + ",100%,50%)"

    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
    context.stroke()
  }

  update() {
    this.x += this.vx
    if (this.x > this.effect.width - this.radius || this.x < this.radius)
      this.vx *= -1

    this.y += this.vy
    if (this.y > this.effect.height - this.radius || this.y < this.radius)
      this.vy *= -1
  }
}

class Effect {
  constructor(settings) {
    const { canvas, radius, radiusAdd, bubbleNumber, color, velocity } =
      settings
    this.width = canvas.width
    this.height = canvas.height
    this.radius = radius
    this.radiusAdd = radiusAdd
    this.bubbleNumber = bubbleNumber
    this.velocity = velocity
    this.color = color

    this.particles = [] // Array for saving particles objects
    this.createParticles() // Method: create particles
  }
  createParticles() {
    for (let i = 0; i < this.bubbleNumber; i++) {
      this.particles.push(new Particle(this))
    }
  }
  drawThenUpdateParticles(context) {
    this.particles.forEach((particle) => {
      particle.draw(context)
      particle.update()
    })
  }
}

const effect = new Effect(settings)
effect.drawThenUpdateParticles(ctx)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  effect.drawThenUpdateParticles(ctx)
  requestAnimationFrame(animate)
}
animate()
