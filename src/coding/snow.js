/** Settings */
const FLAKE_NUMBER = 500
const FLAKE_SIZE = 300
const COLOR = [ 177, 212, 226]
const BACKGROUND_COLOR = [255,255,255]

/** code lines */
let snow

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(RGB, 255)

  snow = new snowStorm()
}

function draw() {
  background(...BACKGROUND_COLOR)
  snow.update()
}

function snowStorm() {
  this.pos = [] /// Each flake's location
  this.vel = [] /// Each flake's speed (related to scale).
  this.size = [] /// The flake's size (related to distance).
  this.flow = [] /// Adds a generalized noise movement
  this.breeze = [] /// Adds a wind force using noise
  this.rot = [] /// Spin the snowflakes
  this.yoff = [] /// Each flake's unique noise value
  // let FLAKE_NUMBER = 175 /// How many flakes
  let sizeset = 0 /// Set the size based on order in array.

  for (let i = 0; i < FLAKE_NUMBER; i++) {
    this.yoff.push(random(1000))
    this.pos.push(createVector(random(width), random(height)))

    /// Set the size using lerp.  This will make more small
    /// flakes with fewer large ones to add depth to the scene.
    sizeset = lerp(sizeset, 5, 0.1)
    this.size.push(FLAKE_SIZE / 100 + 5 - sizeset)

    /// Smaller flakes are in the distance, and should fall
    /// slower to maintain perspective.  Set velocities to scale.
    this.vel.push(createVector(0, this.size[i]))
    this.vel[i].mult(1.25)

    /// Each flake will fall in a general direction plus
    /// each flake has a unique deviation.  This simulates how
    /// aerodynamics disturb the constant rate of descent.
    this.flow.push(0)
    this.breeze.push(random(0.75))
    this.rot.push(random(-PI, PI))
  }

  this.update = function () {
    for (let i = 0; i < FLAKE_NUMBER; i++) {
      this.yoff[i] += 0.05
      this.pos[i].add(this.vel[i])

      /// Generate common movement.
      this.flow[i] = map(
        noise((i + 1) * 0.01, this.yoff[i], frameCount * 0.01),
        0,
        1,
        -this.size[i] * 4,
        this.size[i] * 4
      )

      /// Generate unique rotation.
      this.rot[i] = map(
        noise(this.yoff[i] * 0.1, frameCount * 0.00001),
        0,
        1,
        -TWO_PI,
        TWO_PI
      )

      /// Provide for left or right wind force.
      let switchmove = map(
        noise(this.yoff[i] * 0.1, frameCount * 0.005),
        0,
        1,
        -3,
        3
      )
      /// Applies scale to wind force.
      let move = map(this.size[i], 1, 5, 0.1, 2)
      move *= switchmove

      /// Accumulate the wind force.
      this.pos[i].x += move

      this.bounds(i)

      push()
      /// Brighter colors in front (large flakes),
      /// dimmer colors in back (small flakes).
      let brightness = map(this.size[i], 1, 5, 32, 255)
      // stroke(brightness, 150)
      stroke(...COLOR, brightness)
      strokeWeight(this.size[i])

      push()
      translate(this.pos[i].x + this.flow[i], this.pos[i].y + this.flow[i])
      rotate(this.rot[i])

      /// Change the shape of the snowflakes.
      let flip = map(
        this.rot[i],
        -TWO_PI,
        TWO_PI,
        -this.size[i] * 4,
        this.size[i] * 4
      )

      let scale = this.size[i]
      line(-scale - flip, 0, scale + flip, 0)
      line(0, scale + flip, 0, -scale - flip)
      line(scale, scale, -scale, -scale)
      line(scale, -scale, -scale, scale)
      pop()

      pop()
    }
  }

  this.bounds = function (i) {
    /// Reset to top or wrap-around when
    /// out-of-bounds.
    /// Keep current size, and factor velocity.

    if (this.pos[i].y > height) {
      this.pos[i] = createVector(random(width), 0)
      this.vel[i] = createVector(0, this.size[i])
      this.vel[i].mult(1.25)
    }
    if (this.pos[i].x > width) {
      this.pos[i].x = 0
    }
    if (this.pos[i].x < 0) {
      this.pos[i].x = width
    }
  }
}
