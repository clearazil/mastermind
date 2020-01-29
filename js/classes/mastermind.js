import MastermindDom from './mastermind-dom';

/**
 * Controls the Mastermind game mechanics
 */
export default class Mastermind {
    _dom = new MastermindDom;
    _currentRowId;
    _colorsToGuess;

    /**
     * @return {MastermindDom}
     */
    get dom() {
        return this._dom;
    }

    /**
     * @return {array}
     */
    get codeColors() {
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
     * @param {array} colors
     */
    set codeToGuess(colors) {
        this._colorsToGuess = colors;
    }

    /**
     * @return {array}
     */
    get codeToGuess() {
        return this._colorsToGuess;
    }

    /**
     * Generate a code of 4 colors
     */
    generateColorCode() {
        let colorKeyIndex;
        const codeToGuess = [];

        for (let i = 1; i <= 4; i++) {
            colorKeyIndex = Math.round(Math.random() * 5);
            codeToGuess.push(this.codeColors[colorKeyIndex]);
        }

        this.codeToGuess = codeToGuess;
    }

    /**
     *
     */
    createNewGame() {
        this._dom.createNewBoard();
        this.generateColorCode();
        this.currentRowId = 1;
    }

    /**
     * Action when the player confirms
     * choosing a row of colors
     */
    chooseColors() {
        const colors = this.dom.getChosenColors();

        if (this.isColorsValid(colors)) {
            this.dom.displayKeyPegs(this.getKeyPegHintColors(colors));

            if (this.isCorrectGuess(colors)) {
                this.dom.displayGameWonMessage();
            } else {
                this.currentRowId++;
                this.dom.advanceToNextRow(this.currentRowId);
            }
        } else {
            this.dom.displayErrorMessage();
        }
    }

    /**
     * Get the amount of red and
     * white hint pegs to give
     * @param {array} rowColors
     * @return {object}
     */
    getKeyPegHintColors(rowColors) {
        // avoid changing the rowColors variable
        const colors = rowColors.slice(0);

        const pegHints = {
            red: 0,
            white: 0,
        };

        const incorrectPositions = [];
        const colorsNotGuessed = [];

        for (let i = 0; i < colors.length; i++) {
            if (this.codeToGuess[i] === colors[i]) {
                colors[i] = null;
                pegHints.red++;
            } else {
                incorrectPositions.push(i);
                colorsNotGuessed.push(this.codeToGuess[i]);
            }
        }

        for (let i = 0; i < colors.length; i++) {
            const isInWrongPlace = colorsNotGuessed.includes(colors[i]);

            if (incorrectPositions.includes(i) && isInWrongPlace) {
                pegHints.white++;

                // delete the color, to ensure white key
                // pegs are not awarded for one color twice
                const index = colorsNotGuessed.indexOf(colors[i]);
                colorsNotGuessed.splice(index, 1);
            }
        }

        return pegHints;
    }

    /**
     * Check if the player has correctly
     * guessed the four colors
     * @param {array} colors
     * @return {bool}
     */
    isCorrectGuess(colors) {
        for (let i = 0; i < colors.length; i++) {
            if (this.codeToGuess[i] !== colors[i]) {
                return false;
            }
        }

        return true;
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
            if (this.codeColors.includes(colors[i]) === false) {
                return false;
            }
        }

        return true;
    }
}
