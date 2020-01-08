"use strict"

let newGameButton = document.querySelector('#new-game-button');

// get the prototype html, set colors and replace the game board's html with what is created here
newGameButton.onclick = () => {
    let prototype = document.querySelector('#game-row-prototype').innerHTML;

    let html = '';
    for (let i = 1; i <= 12; i++) {
        let color = 'dark-grey';
        if (i === 1) {
            color = 'color-blank';
        }

        // does not work, probably need to escape { and } ?
        html += prototype.replace(/<{color}/g, '');
    }

    console.log(html);

    let gameBoard = document.querySelector('#game-board');

    let classAttribute = gameBoard.getAttribute('class');
    gameBoard.setAttribute('class', classAttribute.replace('hide', 'show'));
}
