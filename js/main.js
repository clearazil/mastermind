import Mastermind from './classes/mastermind';

"use strict"

let newGameButton = document.querySelector('#new-game-button');

let mastermind = new Mastermind();

newGameButton.onclick = () => {
    mastermind.createNewGame();
}

// choose color on click event


