import Modal from './modal';

/**
 * Displays the interface elements of the game
 */
export default class MastermindDom {
    _modal = new Modal();
    prototype = {
        gameRow: document.querySelector('#game-row-prototype'),
        confirmButton: document.querySelector('#confirm-button-prototype')
    };

    /**
     * get the prototype html, set colors and replace the
     * game board's html with what is created here
     */
    createNewBoard() {
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

        const gameBoard = document.querySelector('#game-board');
        const classAttribute = gameBoard.getAttribute('class');

        gameBoard.innerHTML = html;

        const firstRow = document.querySelector('#row-id-1');

        // clone the node to prevent removing the prototype
        firstRow.appendChild(
            this.prototype.confirmButton.firstElementChild.cloneNode(true),
        );

        gameBoard.setAttribute('class', classAttribute.replace('hide', 'show'));

        this.addChangeColorEvent();
    }

    currentButton;

    /**
     *
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

        this.addConfirmNewColorEvent();
    }

    /**
     *
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
