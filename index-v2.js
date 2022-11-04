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

const gravity = 0.7

// storing this.position in an object - can now reference with other objects in Sprite class
const player = new Fighter({
  position: {
    // use {} to make it an object
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
  imageSrc: '...',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 125,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: '...',
      framesMax: 8
    },
    run: {
      imageSrc: '...',
      framesMax: 8
    },
    jump: {
      imageSrc: '...',
      framesMax: 2
    },
    fall: {
      imageSrc: '...',
      framesMax: 2
    },
    runShoot: {
      imageSrc: '...',
      framesMax: 6
    },
    takeHit: {
      imageSrc: '...',
      framesMax: 4
    },
    death: {
      imageSrc: '...',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

player.image()
// console.log(player)

// Opponent

const opponent = new Fighter({
  position: {
    // use {} to make it an object
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
  imageSrc: '...',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: '...',
      framesMax: 8
    },
    run: {
      imageSrc: '...',
      framesMax: 8
    },
    jump: {
      imageSrc: '...',
      framesMax: 2
    },
    fall: {
      imageSrc: '...',
      framesMax: 2
    },
    attack1: {
      imageSrc: '...',
      framesMax: 6
    },
    takeHit: {
      imageSrc: '...',
      framesMax: 4
    },
    death: {
      imageSrc: '...',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

opponent.image()

// Animation Loop
// - selects which function to loop repeatedly, until told to stop
// - clear canvas for each frame loop to get rid of streak effect
// - set velocity within animation loop for most accurate movement possible

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
  // 'd' moves player left
  d: {
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

function animation() {
  window.requestAnimationFrame(animation)
  //   console.log('go') <-- making sure loop works
  context.fillStyle = 'black' // <-- sprites maintain their color while background clears
  context.fillRect(0, 0, canvasEl.width, canvasEl.height)
  background.startAnimate()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  context.fillRect(0, 0, canvasEl.width, canvasEl.height)
  player.startAnimate()
  opponent.startAnimate()

  player.velocity.x = 0
  opponent.velocity.x = 0

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey == 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (opponent.velocity.y < 0) {
    opponent.switchSprite('jump')
  } else if (opponent.velocity.y > 0) {
    opponent.switchSprite('fall')
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

  // Ends game when health is 0
  if (opponent.health <= 0 || player.health <= 0) {
    determineWinner({ player, opponent, timerId })
  }
}

animation()

// Event Listeners
// Listener for keydown: (event) occurs when any key on keyboard is pressed down
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    // if key = 'key pressed' then call code that moves player
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      //   player.velocity.x = 1 // <- moving 1 px for every frame loop
      break
    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
      //   player.velocity.x = -1
      break
    case '':
      player.attack()
      break
  }
  //   console.log(event) //<-- check keydown event works

  //! Placeholder for adding multiple opponent choices
  //   if (!opponent.dead) {
  //     switch (event.key) {
  //       case 'ArrowRight':
  //         keys.ArrowRight.pressed = true
  //         opponent.lastKey = 'ArrowRight'
  //         break
  //       case 'ArrowLeft':
  //         keys.ArrowLeft.pressed = true
  //         opponent.lastKey = 'ArrowLeft'
  //         break
  //       case 'ArrowUp':
  //         opponent.velocity.y = -20
  //         break
  //       case 'ArrowDown':
  //         opponent.attack()

  //         break
  //     }
  //   }
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
      //   player.velocity.x = 0
      break
  }
  //   console.log(event) //<-- check keyup event works

  // Opponent keys

  switch (event.keys) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
