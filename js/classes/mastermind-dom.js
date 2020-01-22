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
    confirmButton;
    _currentRowId = 1;

    /**
     * @return {int}
     */
    get currentRowId() {
        return this._currentRowId;
    }

    /**
     * @param {int} rowId
     */
    set currentRowId(rowId) {
        this._currentRowId = rowId;
    }

    /**
     * @return {HTMLElement}
     */
    get currentRow() {
        return document.querySelector('#row-id-' + this.currentRowId);
    }

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
        this.confirmButton = this.prototype.confirmButton.
            firstElementChild.cloneNode(true);

        firstRow.appendChild(
            this.confirmButton,
        );

        gameBoard.setAttribute('class', classAttribute.replace('hide', 'show'));
    }

    currentButton;

    /**
     * Event for changing a color
     */
    addChangeColorEvent() {
        document.addEventListener('click', (event) => {
            const button = event.target;

            if (button) {
                const buttonRowId = button.
                    parentElement.getAttribute('data-row-id');

                if (
                    button.classList.contains('game-board-colors') &&
                    parseInt(buttonRowId) === this.currentRowId
                ) {
                    this._modal.open();
                    this.currentButton = event.target;
                }
            }
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

    /**
     * @return {array} colors
     */
    getChosenColors() {
        const rowColorElements = this.currentRow.
            querySelectorAll('.game-board-colors');

        const colors = [];

        /** @param {HTMLElement} element */
        rowColorElements.forEach((element) => {
            colors.push(element.getAttribute('data-color'));
        });

        return colors;
    }

    /**
     * @param {int} rowId
     */
    advanceToNextRow(rowId) {
        this.currentRowId = rowId;

        const colorButtons = this.currentRow.
            querySelectorAll('.game-board-colors, .game-output-colors');

        colorButtons.forEach((button) => {
            const buttonClass = button.getAttribute('class');
            const buttonColor = button.getAttribute('data-color');

            button.setAttribute(
                'class', buttonClass.replace(buttonColor, 'color-blank'),
            );
            button.setAttribute('data-color', 'color-blank');
        });

        this.currentRow.appendChild(
            this.confirmButton,
        );
    }

    /**
     *
     */
    displayErrorMessage() {
        console.log('error!!');
        // TODO
    }

    /**
     *
     */
    displayGameWonMessage() {
        console.log('game won!');
        // TODO
    }
}
