// ! Start of with just rectangles to learn the functionality between
// ! those rectangles first, to learn the functionality and the basics behind a fighting game

// ===== Sprite class

// == Wrapping arguments in an single object; order does not matter anymore because
// they are bing passed through as properties within an object
// ~ cleaner syntax because of the added object destructuring within the constructor function

// == Velocity and Gravity
// Velocity
//  - when you have movement a velocity property onto your sprite class
//  -velocity determines in which direction sprites should be moving
//    when they are inside of an animation loop
// ~ Adding velocity and gravity makes sure player and opponent fall to bottom of screen

// Gravity
//  - acceleration onto our y velocity; over time as long as our object is up in
//    in the air, it will keep adding a value onto this velocity until it hits the ground

const gravity = 0.2
class Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 }
  }) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.offset = offset
  }

  image() {
    context.startAnimate(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
    // context.fillStyle = 'red'
    // context.fillRect(this.position.x, this.position.y, 50, this.height) //< - ref x, y values in player object
  }
  animateFrames() {
    this.framesElapsed++
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  // call image to begin animation
  startAnimate() {
    this.image()
    this.animateFrames()
  }
}

// call image to begin animation
//   startAnimate() {
//     this.image()

// call startAnimate within the animation loop to initiate
//     this.position.x += this.velocity.x
//     this.position.y += this.velocity.y

// (this.position) + (this.height) equal to the bottom of a sprite
// plus the sprites velocity
//     //! - So if the bottom of the sprite + sprite velocity is greater than or equal to
//     //!   the bottom of the canvas, set velocity to 0 to prevent it from falling down past the canvas
//     if (this.position.y + this.height + this.velocity.y >= canvasEl.height) {
//       this.velocity.y = 0
//     } else {
// only adding gravity to y velocity if player/opponent are above the value of canvas height
//       this.velocity.y += gravity
//     }
//   }
