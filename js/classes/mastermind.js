import MastermindDom from './mastermind-dom';

/**
 * Controls the Mastermind game mechanics
 */
export default class Mastermind {
    _dom = new MastermindDom;
    currentRow;

    /**
     *
     */
    createNewGame() {
        this._dom.createNewBoard();
        this.currentRow = 1;
    }
}
