// Assign code entry point to window:load event
//  - prevents page from running until whole html page has finished loading any necessary resources
//  -making sure assets used are available before use

// window.onload = function () {
// }
const canvasEl = document.querySelector('canvas') // reference to canvas element

const context = canvasEl.getContext('2d')
// Once you have the canvas context, you can use the canvas api method
//  you can call to draw a white background ~
// (context.fillRect) : fillRect takes 4 arguments (x, y, width, height)
// context.fillRect(0, 0, canvas.width, canvas.height)

// set width and height properties to canvas element
canvasEl.width = 1024
canvasEl.height = 576
// == - best to keep original size dimensions but still scale the canvas style (bounding box)
// == - actual width and height attributes: change the physical size of the canvas image area
// == - bounding boc: changes the dimensions of how it is drawn on the page
// == - can also move hard coded value to an object and replace the values with the object and get same result

// checks that variable are created
console.log(context)
console.log(canvasEl)
//   console.log('Document is ready!') // checks to make sure page is loading properly

// ! Start of with just rectangles to learn the functionality between
// ! those rectangles first, to learn the functionality and the basics behind a fighting game

// ===== Sprite class

// Line-17 - Wrapping arguments in an single object; order does not matter anymore because
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
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.height = 150
  }
  image() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, 50, this.height) //< - ref x, y values in player object
  }
  // call image to begin animation
  startAnimate() {
    this.image()

    // call startAnimate within the animation loop to initiate
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // (this.position) + (this.height) equal to the bottom of a sprite
    // plus the sprites velocity
    //! - So if the bottom of the sprite + sprite velocity is greater than or equal to
    //!   the bottom of the canvas, set velocity to 0 to prevent it from falling down past the canvas
    if (this.position.y + this.height + this.velocity.y >= canvasEl.height) {
      this.velocity.y = 0
    } else {
      // only adding gravity to y velocity if player/opponent are above the value of canvas height
      this.velocity.y += gravity
    }
  }
}

// storing this.position in an object - can now reference with other objects in Sprite class
const player = new Sprite({
  position: {
    // use {} to make it an object
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  }
})

player.image()
// console.log(player)

// Opponent

const opponent = new Sprite({
  position: {
    // use {} to make it an object
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  }
})

opponent.image()

// Animation Loop
// - selects which function to loop repeatedly, until told to stop
// - clear canvas for each frame loop to get rid of streak effect

function animation() {
  window.requestAnimationFrame(animation)
  //   console.log('go') <-- making sure loop works
  context.fillStyle = 'black' // <-- sprites maintain their color while background clears
  context.fillRect(0, 0, canvasEl.width, canvasEl.height)
  player.startAnimate()
  opponent.startAnimate()
}

animation()

// Event Listeners
// - keydown: (event) occurs when any key on keyboard is pressed down
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    // if key = 'key pressed' then call code that moves player
    case 'd':
      player.velocity.x = 1 // <- moving 1 px for every frame loop
      break
  }
  console.log(event) //<-- check keydown event works
})

// Listener for a keyup event

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    // player will stop moving on keyup event
    case 'd':
      player.velocity.x = 0
      break
  }
  console.log(event) //<-- check keyup event works
})
