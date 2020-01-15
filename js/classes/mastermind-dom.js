import Modal from './modal';

export default class MastermindDom {
    constructor() {
        this._modal = new Modal();
    }

    prototype = {
        gameRow: document.querySelector('#game-row-prototype'),
        confirmButton: document.querySelector('#confirm-button-prototype')
    };

    /**
     * get the prototype html, set colors and replace the game board's html with what is created here
     */
    createNewBoard() {
        let html = '';
        for (let i = 1; i <= 12; i++) {
            let color = 'dark-grey';
            if (i === 1) {
                color = 'color-blank';
            }
    
            html += this.prototype.gameRow.innerHTML.replace(/--color--|--id--/g, (match) => {
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

        // clone the node to prevent removing the prototype
        firstRow.appendChild(this.prototype.confirmButton.firstElementChild.cloneNode(true));
    
        gameBoard.setAttribute('class', classAttribute.replace('hide', 'show'));

        this.addChangeColorEvent();
    }

    currentButton;

    addChangeColorEvent() {
        let currentRow = document.querySelector('#row-id-1');

        let colorButtons = currentRow.querySelectorAll('.game-board-colors');

        colorButtons.forEach((button) => {
            button.onclick = () => {
                this._modal.open();
                this.currentButton = button;
            };
        });

        this.addConfirmNewColorEvent();
    }

    addConfirmNewColorEvent() {
        let selectColorButtons = document.querySelectorAll('.select-colors');

        selectColorButtons.forEach((button) => {
            button.onclick = () => {
                let currentColor = this.currentButton.getAttribute('data-color');
                let chosenColor = button.getAttribute('data-color');

                let classAttribute = this.currentButton.getAttribute('class');

                this.currentButton.setAttribute('data-color', chosenColor);
                this.currentButton.setAttribute('class', classAttribute.replace(currentColor, chosenColor));

                this._modal.close();
            };
        });
    }
}