import Modal from './modal';

/**
 * Displays the interface elements of the game
 */
export default class MastermindDom {
    _modal = new Modal();
    prototype = {
        gameRow: document.querySelector('#game-row-prototype'),
        confirmButton: document.querySelector('#confirm-button-prototype'),
    };

    /**
     * Create a new board
     */
    createNewBoard() {
        const html = this.generateHtml();
        this.appendBoardHtml(html);

        this.addChangeColorEvent();
        this.addConfirmNewColorEvent();
    }

    /**
     * get the prototype html, set colors
     * @return {string} html
     */
    generateHtml() {
        let html = '';
        for (let i = 1; i <= 12; i++) {
            let color = 'dark-grey';
            if (i === 1) {
                color = 'color-blank';
            }

            const gameRowHtml = this.prototype.gameRow.innerHTML;
            html += gameRowHtml.replace(/--color--|--id--/g, (match) => {
                if (match === '--id--') {
                    return i;
                }

                return color;
            });
        }

        return html;
    }

    /**
     * Replace the board's html
     * @param {string} html
     */
    appendBoardHtml(html) {
        const gameBoard = document.querySelector('#game-board');
        const classAttribute = gameBoard.getAttribute('class');

        gameBoard.innerHTML = html;

        const firstRow = document.querySelector('#row-id-1');

        // clone the node to prevent removing the prototype
        firstRow.appendChild(
            this.prototype.confirmButton.firstElementChild.cloneNode(true),
        );

        gameBoard.setAttribute('class', classAttribute.replace('hide', 'show'));
    }

    currentButton;

    /**
     * Event for changing a color
     */
    addChangeColorEvent() {
        const currentRow = document.querySelector('#row-id-1');

        const colorButtons = currentRow.querySelectorAll('.game-board-colors');

        colorButtons.forEach((button) => {
            button.onclick = () => {
                this._modal.open();
                this.currentButton = button;
            };
        });
    }

    /**
     * Event for confirming a new color
     */
    addConfirmNewColorEvent() {
        const selectColorButtons = document.querySelectorAll('.select-colors');

        selectColorButtons.forEach((button) => {
            button.onclick = () => {
                const currentColor = this.currentButton
                    .getAttribute('data-color');
                const chosenColor = button.getAttribute('data-color');

                const classAttribute = this.currentButton.getAttribute('class');

                this.currentButton.setAttribute('data-color', chosenColor);
                this.currentButton.setAttribute(
                    'class', classAttribute.replace(currentColor, chosenColor),
                );

                this._modal.close();
            };
        });
    }
}
