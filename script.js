'use strict';

// selecting score displays by Id
const score0display  = document.querySelector('#score--0');
const score1display = document.querySelector('#score--1');  

// Selection buttons 
const rollDice = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const holdScore = document.querySelector(".btn--hold");

// changing the default value to zero

// removing dice in the beginning
const diceImg = document.querySelector('.dice');
diceImg.classList.add('hidden');

// getting current player 
const currentPlayer0 = document.getElementById('current--0');
const currentPlayer1 = document.getElementById('current--1');


// getting player 
const playerVar0 = document.querySelector('.player--0');
const playerVar1 = document.querySelector('.player--1');

// new game variable
const newGameVar = document.querySelector('.btn--new');

let totalScores, playing, activePlayer, currentScore;
let winner = [0, 0]


const starting = function() {
    currentPlayer0.textContent = 0;
    currentPlayer1.textContent = 0;
    score0display.textContent = 0;
    score1display.textContent = 0;

    playing = true;
    totalScores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    playerVar0.classList.remove('player--winner')
    playerVar1.classList.remove('player--winner')

    playerVar0.classList.add('player--active');
    playerVar1.classList.remove('player--active');
};

starting();


const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    playerVar0.classList.toggle('player--active');
    playerVar1.classList.toggle('player--active');

    activePlayer = activePlayer === 0 ? 1 : 0;
    times = 0;
};

let times = 0;


// Roll dice Event listener 
rollDice.addEventListener('click', function() {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1; // Getting rolled dice
  
        diceImg.classList.remove('hidden');
        diceImg.src = `images/dice-${dice}.png`;
    
        if (dice !== 1) {
            currentScore += dice;
            times++;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

            if (times === 5) {
                holdGame();
            }


        } else {
            switchPlayer();
        }
    }
});

const holdGame = function() {
    if (playing) {
        totalScores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];

        if (totalScores[activePlayer] >= 50) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            document.querySelector('.winners').classList.remove('hidden');
            winner[activePlayer] += 1 
            document.querySelector(`.winner-${activePlayer}`).textContent = winner[activePlayer];

            playing = false;
            diceImg.classList.toggle('hidden');
        }

        times = 0;
        switchPlayer();
    }
};

holdScore.addEventListener('click', function () {
    holdGame();
});

newGameVar.addEventListener("click", starting);

const closeOverlay = document.querySelector('.closeOverlay');
const overlay = document.querySelector('.overlay');
const openOverlay = document.querySelector('.displayOverlay');

overlay.addEventListener('click', function () {
    overlay.classList.add('hidden');
});
closeOverlay.addEventListener('click', function () {
    overlay.classList.add('hidden');
});
openOverlay.addEventListener('click', function () {
    overlay.classList.remove('hidden');
})