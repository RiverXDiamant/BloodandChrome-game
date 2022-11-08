// rectangle1: opponent,
// rectangle2: player

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.hitbox.position.x + rectangle1.hitbox.width >=
      rectangle2.position.x &&
    rectangle1.hitbox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.hitbox.position.y + rectangle1.hitbox.height >=
      rectangle2.position.y &&
    rectangle1.hitbox.position.y <= rectangle2.position.y + rectangle2.height
  )
}


// Player and Opponent Health Bars
// Determines winner of round
function determineWinner({ player, opponent, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health === opponent.health) {
    document.querySelector('#displayText').innerHTML = 'Tie'
  } else if (player.health > opponent.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
  } else if (player.health < opponent.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
  }
}


// Round Timer
let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, opponent, timerId })
  }
}

