import Modal from './modal';

/**
 * Displays the interface elements of the game
 */
export default class MastermindDom {
    _chooseColorModal = new Modal('#choose-color');
    _incorrectColorsModal = new Modal('#incorrect-colors');
    _gameLostModal = new Modal('#game-lost');
    _gameWonModal = new Modal('#game-won');

    prototype = {
        gameRow: document.querySelector('#game-row-prototype'),
        confirmButton: document.querySelector('#confirm-button-prototype'),
    };
    _confirmButton;
    _currentRowId = 1;

    /**
     * @return {Modal}
     */
    get chooseColorModal() {
        return this._chooseColorModal;
    }

    /**
     * @param {Modal} modal
     */
    set chooseColorModal(modal) {
        this._chooseColorModal = modal;
    }

    /**
     * @return {Modal}
     */
    get incorrectColorsModal() {
        return this._incorrectColorsModal;
    }

    /**
     * @param {Modal} modal
     */
    set incorrectColorsModal(modal) {
        this._incorrectColorsModal = modal;
    }

    /**
     * @return {Modal}
     */
    get gameLostModal() {
        return this._gameLostModal;
    }

    /**
     * @param {Modal} modal
     */
    set gameLostModal(modal) {
        this._gameLostModal = modal;
    }

    /**
     * @return {Modal}
     */
    get gameWonModal() {
        return this._gameWonModal;
    }

    /**
     * @param {Modal} modal
     */
    set gameWonModal(modal) {
        this._gameWonModal = modal;
    }

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
     * @return {HTMLElement}
     */
    get confirmButton() {
        return this._confirmButton;
    }

    /**
     * @param {HTMLElement} confirmButton
     */
    set confirmButton(confirmButton) {
        this._confirmButton = confirmButton;
    }

    /**
     * Create a new board
     * @param {int} maxRows
     */
    createNewBoard(maxRows) {
        const html = this.generateHtml(maxRows);
        this.appendBoardHtml(html);

        this.addChangeColorEvent();
        this.addConfirmNewColorEvent();
    }

    /**
     * get the prototype html, set colors
     * @param {int} maxRows
     * @return {string} html
     */
    generateHtml(maxRows) {
        let html = '';
        for (let i = 1; i <= maxRows; i++) {
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

            if (button && button.parentElement) {
                const buttonRowId = button.
                    parentElement.getAttribute('data-row-id');

                if (
                    button.classList.contains('game-board-colors') &&
                    parseInt(buttonRowId) === this.currentRowId
                ) {
                    this.chooseColorModal.open();
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
                const chosenColor = button.getAttribute('data-color');
                this.changeElementColor(this.currentButton, chosenColor);

                this.chooseColorModal.close();
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
            this.changeElementColor(button, 'color-blank');
        });

        this.currentRow.appendChild(
            this.confirmButton,
        );
    }

    /**
     * @param {object} pegColors
     * @property {int} [red] red pegs to display
     * @property {int} [white] white pegs to display
     */
    displayKeyPegs(pegColors) {
        const outputElements = this.currentRow.
            querySelectorAll('.game-output-colors');

        outputElements.forEach((element) => {
            if (pegColors.red > 0) {
                this.changeElementColor(element, 'red');
                pegColors.red--;
            } else if (pegColors.white > 0) {
                this.changeElementColor(element, 'white');
                pegColors.white--;
            }
        });
    }

    /**
     * @param {HTMLElement} element
     * @param {string} newColor
     */
    changeElementColor(element, newColor) {
        const elementClass = element.getAttribute('class');
        const elementColor = element.getAttribute('data-color');

        element.setAttribute(
            'class', elementClass.replace(elementColor, newColor),
        );
        element.setAttribute('data-color', newColor);
    }

    /**
     *
     */
    displayErrorMessage() {
        this.incorrectColorsModal.open();
    }

    /**
     * @param {array} colorCode
     */
    displayGameLostMessage(colorCode) {
        const codeColors = document.querySelectorAll('.code-colors');

        for (let i = 0; i < colorCode.length; i++) {
            this.changeElementColor(codeColors[i], colorCode[i]);
        }

        this.gameLostModal.open();
    }

    /**
     *
     */
    displayGameWonMessage() {
        this.gameWonModal.open();
    }

    /**
     * Remove the confirm button
     */
    removeConfirmButton() {
        this.confirmButton.remove();
    }
}
