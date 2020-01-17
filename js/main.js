import Mastermind from './classes/mastermind';

'use strict';

const newGameButton = document.querySelector('#new-game-button');

const mastermind = new Mastermind();

newGameButton.onclick = () => {
    mastermind.createNewGame();
};

// choose color on click event
