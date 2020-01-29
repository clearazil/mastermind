import MastermindDom from './mastermind-dom';

/**
 * Controls the Mastermind game mechanics
 */
export default class Mastermind {
    _dom = new MastermindDom;
    _currentRowId;

    /**
     * @return {MastermindDom}
     */
    get dom() {
        return this._dom;
    }

    /**
     * @return {array}
     */
    get validColors() {
        return [
            'blue',
            'green',
            'purple',
            'pink',
            'orange',
            'yellow',
        ];
    }

    /**
     * @param {int} rowId
     */
    set currentRowId(rowId) {
        this._currentRowId = rowId;
    }

    /**
     * @return {int}
     */
    get currentRowId() {
        return this._currentRowId;
    }

    /**
     *
     */
    createNewGame() {
        this._dom.createNewBoard();
        this.currentRowId = 1;
    }

    /**
     * Action when the player confirms
     * choosing a row of colors
     */
    chooseColors() {
        const colors = this.dom.getChosenColors();

        if (this.isColorsValid(colors)) {
            if (this.isCorrectGuess()) {
                this.dom.displayGameWonMessage();
            } else {
                this.currentRowId++;

                this.dom.displayKeyPegs(this.getKeyPegHintColors());
                this.dom.advanceToNextRow(this.currentRowId);
            }
        } else {
            this.dom.displayErrorMessage();
        }
    }

    /**
     * @return {object}
     */
    getKeyPegHintColors() {
        // TODO
        return {
            red: 1,
            white: 1,
        };
    }

    /**
     * Check if the player has correctly
     * guessed the four colors
     * @return {bool}
     */
    isCorrectGuess() {
        return false; // TODO
    }

    /**
     * Determine if the row of colors does not
     * include any color other than blue, green,
     * purple, pink, orange or yellow; aka: one
     * of the colors is not blank
     * @param {array} colors
     * @return {bool}
     */
    isColorsValid(colors) {
        for (let i = 0; i < colors.length; i++) {
            if (this.validColors.includes(colors[i]) === false) {
                return false;
            }
        }

        return true;
    }
}
