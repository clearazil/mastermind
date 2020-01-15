"use strict"

let newGameButton = document.querySelector('#new-game-button');

// get the prototype html, set colors and replace the game board's html with what is created here
newGameButton.onclick = () => {
    let prototype = {
        gameRow: document.querySelector('#game-row-prototype'),
        confirmButton: document.querySelector('#confirm-button-prototype')
    };

    let html = '';
    for (let i = 1; i <= 12; i++) {
        let color = 'dark-grey';
        if (i === 1) {
            color = 'color-blank';
        }

        html += prototype.gameRow.innerHTML.replace(/--color--|--id--/g, (match) => {
            if (match === '--id--') {
                return i;
            }
            
            return color;
        });
    }

    let gameBoard = document.querySelector('#game-board');
    let classAttribute = gameBoard.getAttribute('class');

    gameBoard.innerHTML = html;

    let firstRow = document.querySelector('#row-id-1');
    firstRow.appendChild(prototype.confirmButton.firstElementChild);

    gameBoard.setAttribute('class', classAttribute.replace('hide', 'show'));
}
