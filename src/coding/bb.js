// You can personize your tank bubbles by setting the values below
const settings = {
  radius: 10,
  radiusAdd: 40,
  bubbleNumber: 50,
  color: 300,
  velocity: 1,
}
// END HERE

const canvas = document.getElementById("cnvs")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

ctx.strokeStyle = "black"

class Particle {
  constructor(effect) {
    this.effect = effect
    this.radius = Math.random() * this.effect.radiusAdd + this.effect.radius
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2)
    this.vx = Math.random() * this.effect.velocity
    this.vy = Math.random() * this.effect.velocity
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
  constructor(canvas, settings) {
    this.canvas = canvas
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.particles = []

    // settings
    this.radius = settings.radius
    this.radiusAdd = settings.radiusAdd
    this.NumberOfParticles = settings.bubbleNumber
    this.velocity = settings.velocity
    this.color = settings.color

    // create particles
    this.createParticles()
  }
  createParticles() {
    for (let i = 0; i < this.NumberOfParticles; i++) {
      this.particles.push(new Particle(this))
    }
  }
  handleParticles(context) {
    this.particles.forEach((particle) => {
      particle.draw(context)
      particle.update()
    })
  }
}

const effect = new Effect(canvas, settings)
// effect.NumberOfParticles = BUBBLE_NUMBER
// effect.createParticles()
effect.handleParticles(ctx)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  effect.handleParticles(ctx)
  requestAnimationFrame(animate)
}
animate()
