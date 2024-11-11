const canvas = document.getElementById("cnvs")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")
ctx.fillStyle = "blue"

class Particle {
  constructor(effect) {
    this.effect = effect
    this.x = Math.random() * this.effect.width
    this.y = Math.random() * this.effect.height
    this.radius = 15
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.particles = []
    this.NumberOfParticles = 20
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
    })
  }
}

const effect = new Effect(canvas)
effect.handleParticles(ctx)

function animate() {}
