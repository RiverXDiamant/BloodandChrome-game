// Assign code entry point to window:load event
//  - prevents page from running until whole html page has finished loading any necessary resources
//  -making sure assets used are available before use

// window.onload = function () {
// }

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

// Once you have the canvas context, you can use the canvas api method
//  you can call to draw a white background ~
// (context.fillRect) : fillRect takes 4 arguments (x, y, width, height)
// context.fillRect(0, 0, canvas.width, canvas.height)

// set width and height properties to canvas element
canvas.width = 1024
canvas.height = 576
// == - best to keep original size dimensions but still scale the canvas style (bounding box)
// == - actual width and height attributes: change the physical size of the canvas image area
// == - bounding boc: changes the dimensions of how it is drawn on the page
// == - can also move hard coded value to an object and replace the values with the object and get same result
context.fillRect(0, 0, canvas.width, canvas.height)

// == Velocity and Gravity
// Velocity
//  - when you have movement a velocity property onto your sprite class
//  -velocity determines in which direction sprites should be moving
//    when they are inside of an animation loop
// ~ Adding velocity and gravity makes sure player and opponent fall to bottom of screen

// Gravity
//  - acceleration onto our y velocity; over time as long as our object is up in
//    in the air, it will keep adding a value onto this velocity until it hits the ground

const gravity = 0.7

// Background
const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/sunset.jpg'
})

const shop = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
})

// storing this.position in an object - can now reference with other objects in Sprite class
const player = new Fighter({
  // use {} to make it an object
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/hanako/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/hanako/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/hanako/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/hanako/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/hanako/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/hanako/Attack1.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/hanako/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/hanako/Death.png',
      framesMax: 6
    }
  },
  hitbox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

const opponent = new Fighter({
  // use {} to make it an object
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kiroshi/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kiroshi/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kiroshi/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kiroshi/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kiroshi/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kiroshi/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kiroshi/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kiroshi/Death.png',
      framesMax: 7
    }
  },
  hitbox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

console.log(player)

// Keys
// - Declares all keys we want to use to control game
//  ~ add :if: statement to animation function

const keys = {
  // new object
  // 'a' moves left
  a: {
    // new pressed property
    pressed: false
  },
  d: {
    // 'd' moves player left
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

// Animation Loop
// - selects which function to loop repeatedly, until told to stop
// - clear canvas for each frame loop to get rid of streak effect
// - set velocity within animation loop for most accurate movement possible

function animate() {
  window.requestAnimationFrame(animate)
  //   console.log('go') <-- making sure loop works
  context.fillStyle = 'black' // <-- sprites maintain their color while background clears
  context.fillRect(0, 0, canvas.width, canvas.height)
  background.startAnimate()
  shop.startAnimate()
  context.fillStyle = 'rgba(255, 255, 255, 0.15)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  player.startAnimate()
  opponent.startAnimate()

  player.velocity.x = 0
  opponent.velocity.x = 0

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // opponent movement
  if (keys.ArrowLeft.pressed && opponent.lastKey === 'ArrowLeft') {
    opponent.velocity.x = -5
    opponent.switchSprite('run')
  } else if (keys.ArrowRight.pressed && opponent.lastKey === 'ArrowRight') {
    opponent.velocity.x = 5
    opponent.switchSprite('run')
  } else {
    opponent.switchSprite('idle')
  }

  // jumping
  if (opponent.velocity.y < 0) {
    opponent.switchSprite('jump')
  } else if (opponent.velocity.y > 0) {
    opponent.switchSprite('fall')
  }

  // detect for collision & opponent gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: opponent
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    opponent.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: opponent.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: opponent,
      rectangle2: player
    }) &&
    opponent.isAttacking &&
    opponent.framesCurrent === 2
  ) {
    player.takeHit()
    opponent.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (opponent.isAttacking && opponent.framesCurrent === 2) {
    opponent.isAttacking = false
  }

  // end game based on health
  if (opponent.health <= 0 || player.health <= 0) {
    determineWinner({ player, opponent, timerId })
  }
}

animate()

// Event Listeners
// Listener for keydown: (event) occurs when any key on keyboard is pressed down
window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      // if key = 'key pressed' then call code that moves player
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        //   player.velocity.x = -1
        break
      case 'w':
        player.velocity.y = -20
        break
      case ' ':
        player.attack()
        break
    }
  }

  if (!opponent.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        opponent.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        opponent.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        opponent.velocity.y = -20
        break
      case 'ArrowDown':
        opponent.attack()

        break
    }
    //   console.log(event) //<-- check keydown event works
  }
})

// Listener for a keyup event
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    // player will stop moving on keyup event
    case 'd':
      keys.d.pressed = false
      //   player.velocity.x = 0
      break
    case 'a':
      keys.a.pressed = false
      break
  }
  //   console.log(event) //<-- check keyup event works

  // opponent keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
