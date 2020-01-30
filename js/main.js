import Mastermind from './classes/mastermind.js';

'use strict';

const newGameButton = document.querySelector('#new-game-button');

const mastermind = new Mastermind();

newGameButton.onclick = () => {
    mastermind.createNewGame();
};

// choose color on click event
document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains(
        'confirm-colors-button')
    ) {
        mastermind.chooseColors();
    }
});
