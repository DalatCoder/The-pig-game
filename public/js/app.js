console.log('Client javascript is running!')
console.log('>_ Nguyen Trong Hieu - Dai hoc Da Lat')

let roundScore, activePlayer, scores, isPlaying, maxScore

const DOMString = {
  btnRoll: 'btn-roll',
  btnHold: 'btn-hold',
  btnNew: 'btn-new'
}

init()

document.querySelector(`.${DOMString.btnRoll}`).addEventListener('click', () => {
  if (isPlaying) {
    // 1. Create random number
    const randomNumber = Math.floor(Math.random() * 6) + 1

    // 2. Check if random number is equal to 1
    if (randomNumber === 1) {
      // Next player
      nextPlayer()
    } else {
      // Update current score
      roundScore += randomNumber

      // Display on UI
      document.querySelector('.dice').style.display = 'block'
      document.querySelector('.dice').src = `/img/dice-${randomNumber}.png`
      document.getElementById(`current-${activePlayer}`).textContent = roundScore
    }
  }
})

document.querySelector(`.${DOMString.btnHold}`).addEventListener('click', () => {
  if (isPlaying) {
    // Get max score from input
    maxScore = document.querySelector('.final-score').value || 100

    // Add roundScore to active player score
    scores[activePlayer] += roundScore

    // Display on UI
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]

    // Check if player won the game
    if (scores[activePlayer] >= maxScore) {
      // Player won the game
      isPlaying = false

      document.querySelector('.dice').style.display = 'none'
      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!'
      document.getElementById(`current-${activePlayer}`).textContent = 0
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
    } else {
      // Next player
      nextPlayer()
    }
  }
})

document.querySelector(`.${DOMString.btnNew}`).addEventListener('click', init)

function init() {
  activePlayer = 0
  roundScore = 0
  scores = [0, 0]
  isPlaying = true

  document.getElementById('score-0').textContent = scores[0]
  document.getElementById('score-1').textContent = scores[1]
  document.getElementById('current-0').textContent = roundScore
  document.getElementById('current-1').textContent = roundScore

  document.getElementById('name-0').textContent = 'PLAYER 1'
  document.getElementById('name-1').textContent = 'PLAYER 2'
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')

  document.querySelector('.dice').style.display = 'none'
}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  roundScore = 0

  document.getElementById('current-0').textContent = 0
  document.getElementById('current-1').textContent = 0
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

  document.querySelector('.dice').style.display = 'none'
}
