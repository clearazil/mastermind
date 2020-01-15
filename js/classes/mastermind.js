import MastermindDom from './mastermind-dom';

export default class Mastermind {
    constructor() {
        this._dom = new MastermindDom;
    }
    currentRow;

    createNewGame() {
        this._dom.createNewBoard();
        this.currentRow = 1;
    }
}

