'use strict';

// selecting score displays by Id
const score0display  = document.querySelector('#score--0');
const score1display = document.querySelector('#score--1');  

// Selection buttons 
const rollDice = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const holdScore = document.querySelector(".btn--hold");

// changing the default value to zero
score0display.textContent = 0;
score1display.textContent = 0;

// removing dice in the beginning
const diceImg = document.querySelector('.dice');
diceImg.classList.add('hidden');

// getting current player 

const currentPlayer0 = document.getElementById('current--0');
const currentPlayer1 = document.getElementById('current--1');

let currentScore = 0;
let activePlayer = 0;

// getting player 

const playerVar0 = document.querySelector('.player--0');
const playerVar1 = document.querySelector('.player--1');

// holding scores in array 
const totalScores = [0, 0]

const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    playerVar0.classList.toggle('player--active');
    playerVar1.classList.toggle('player--active');

    activePlayer = activePlayer === 0 ? 1 : 0;
};

// Roll dice Event listener 
rollDice.addEventListener('click', function() {

    const dice = Math.trunc(Math.random() * 6) + 1; // Getting rolled dice
  

    diceImg.classList.remove('hidden');
    diceImg.src = `images/dice-${dice}.png`;


    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }

});

holdScore.addEventListener('click', function () {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];

    switchPlayer();
});