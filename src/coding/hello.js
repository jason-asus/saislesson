// You can personize your bubbles by setting the values below
const settings = {
  canvas: null,
  radius: 10,
  radiusAdd: 40,
  bubbleNumber: 50,
  velocity: 1,
  color: "rgb(219, 112, 246)", // 0 - 255
  backgroundColor: "rgb(158, 231, 221)", // 0 - 255
}
// SETTINGS END HERE

const canvas = document.getElementById("cnvs")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.background = settings.backgroundColor
const ctx = canvas.getContext("2d")
settings.canvas = canvas

ctx.strokeStyle = "black"

class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect
    this.x = Math.random() * this.effect.canvasWidth
    this.y = 0
    this.color = color
    this.OriginX = x
    this.OriginY = y
    this.size = this.effect.gap
    this.dx = 0
    this.dy = 0
    this.vx = 0
    this.vy = 0
    this.force = 0
    this.angle = 0
    this.distance = 0
    this.friction = Math.random() * 0.6 + 0.15
    this.ease = Math.random() * 0.1 + 0.005
  }

  draw(context) {
    context.fillStyle = settings.color
    context.fillRect(this.x, this.y, this.size, this.size)
  }

  update() {
    this.x += (this.OriginX - this.x) * this.ease
    this.y += (this.OriginY - this.y) * this.ease
  }
}

class Effect {
  constructor(context, canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.textX = this.canvasWidth / 2
    this.textY = this.canvasHeight / 2
    this.fontSize = 80
    this.lineHeight = this.fontSize * 0.9
    this.maxTextWidth = this.canvasWidth * 0.8
    this.textInput.addEventListener("keyup", (e) => {
      if (e.key !== " ") {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.wrapText(e.target.value)
      }
    })
    this.particles = []
    this.gap = 3
    this.mouse = {
      radius: 20000,
      x: 0,
      y: 0,
    }
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x
      this.mouse.y = e.y
    })
  }
  createParticles() {
    for (let i = 0; i < this.bubbleNumber; i++) {
      this.particles.push(new Particle(this))
    }
  }
  //
  wrapText(text) {
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    )
    gradient.addColorStop(0.3, "red")
    gradient.addColorStop(0.5, "fuchsia")
    gradient.addColorStop(0.7, "purple")
    this.context.fillStyle = gradient
    this.context.textAlign = "center"
    this.context.textBaseLine = "middle"
    this.context.lineWidth = 3
    this.context.strokeStyle = "white"
    this.context.font = this.fontSize + "px Helvetica"

    let linesArray = []
    let words = text.split(" ")
    let lineCounter = 0
    let line = ""
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " "
      if (this.context.measureText(testLine) > this.maxTextWidth) {
        line = words[i] + " "
        lineCounter++
      } else {
        line = testLine
      linesArray[lineCounter]=line
    }
    let textHeight = this.lineHeight*lineCounter
    this.textY = this.canvasHeight*lineCounter
    linesArray.forEach((el,index)=>{
      this.context.fillText(el,this.textX,this.textY+(index*this.lineHeight))
      this.context.strokeText(el,this.textX,this.textY+(index*this.lineHeight))

    })

  }
  //
  convertToParticles() {
    this.particles = []
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    ).data

    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4
        const alpha = pixels[index + 3]
        if (alpha > 0) {
          const red = pixels[index]
          const green = pixels[index + 1]
          const blue = pixels[index + 2]
          const color = "rgb(" + red + "," + green + "," + blue + ")"
          this.particles.push(new Particle(this, x, y, color))
        }
      }
    }
  }
  render() {
    this.particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })
  }
}
}

const effect = new Effect(ctx, canvas.width, canvas.height)
effect.wrapText("Hello Peppa Pig")
effect.render()

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  effect.wrapText("Hello Peppa Pig")
  requestAnimationFrame(animate)
}
animate()
