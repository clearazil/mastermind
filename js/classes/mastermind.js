import MastermindDom from './mastermind-dom.js';

/**
 * Controls the Mastermind game mechanics
 */
export default class Mastermind {
    _dom;
    _currentRowId;
    _colorsToGuess;

    /**
     * @return {MastermindDom}
     */
    get dom() {
        return this._dom;
    }

    /**
     * @param {MastermindDom} dom
     */
    set dom(dom) {
        this._dom = dom;
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
     * @return {int}
     */
    get maxRows() {
        return 12;
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
        this.dom = new MastermindDom;
        this.dom.createNewBoard(this.maxRows);
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
            this.dom.prepareForNextRow();

            if (this.isCorrectGuess(colors)) {
                this.dom.isGameFinished = true;
                this.dom.displayGameWonMessage();
            } else if (this.currentRowId === this.maxRows) {
                this.dom.isGameFinished = true;
                this.dom.displayGameLostMessage(this.codeToGuess);
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
     * @param {array} colors
     * @return {object}
     */
    getKeyPegHintColors(colors) {
        const pegHints = {
            red: 0,
            white: 0,
        };

        const colorOccurences = this.getColorOccurences(colors);

        for (let i = 0; i < colors.length; i++) {
            const colorOccurence = colorOccurences[colors[i]] || 0;

            if (this.codeToGuess[i] === colors[i]) {
                pegHints.red++;

                // if colorOccurence is below 1 with a red peg to award,
                // it means the white peg count is too high
                if (colorOccurence < 1) {
                    pegHints.white--;
                }
            } else if (colorOccurence > 0) {
                pegHints.white++;
            }

            colorOccurences[colors[i]]--;
        }

        return pegHints;
    }

    /**
     * Return how many times a color
     * occurs in the given array
     * @param {array} colors
     * @return {object}
     */
    getColorOccurences(colors) {
        // avoid changing the colors variable
        colors = this.codeToGuess.slice(0);
        colors.sort();

        const colorOccurences = {};
        let previousColor;

        for (let i = 0; i < colors.length; i++) {
            if (previousColor !== colors[i]) {
                colorOccurences[colors[i]] = 1;
            } else {
                colorOccurences[colors[i]]++;
            }

            previousColor = colors[i];
        }

        return colorOccurences;
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
