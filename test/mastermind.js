import Mastermind from './../js/classes/mastermind.js';

const assert = require('assert');

const mastermind = new Mastermind();

describe('Mastermind', function() {
    describe('#maxRows', function() {
        it('should return 12', function() {
            assert.equal(mastermind.maxRows, 12);
        });
    });

    const colorGuesses = [
        {
            colorCode: ['blue', 'green', 'yellow', 'purple'],
            colorGuess: ['blue', 'green', 'yellow', 'purple'],
            expect: {
                red: 4,
                white: 0,
            },
        },
        {
            colorCode: ['blue', 'green', 'yellow', 'purple'],
            colorGuess: ['blue', 'green', 'yellow', 'pink'],
            expect: {
                red: 3,
                white: 0,
            },
        },
        {
            colorCode: ['green', 'yellow', 'blue', 'pink'],
            colorGuess: ['yellow', 'green', 'pink', 'blue'],
            expect: {
                red: 0,
                white: 4,
            },
        },
        {
            colorCode: ['green', 'yellow', 'green', 'pink'],
            colorGuess: ['green', 'green', 'pink', 'green'],
            expect: {
                red: 1,
                white: 2,
            },
        },
        {
            colorCode: ['green', 'blue', 'yellow', 'blue'],
            colorGuess: ['purple', 'green', 'green', 'blue'],
            expect: {
                red: 1,
                white: 1,
            },
        },
        {
            colorCode: ['green', 'yellow', 'green', 'pink'],
            colorGuess: ['yellow', 'green', 'pink', 'blue'],
            expect: {
                red: 0,
                white: 3,
            },
        },
        {
            colorCode: ['green', 'yellow', 'blue', 'pink'],
            colorGuess: ['yellow', 'green', 'pink', 'blue'],
            expect: {
                red: 0,
                white: 4,
            },
        },
        {
            colorCode: ['green', 'yellow', 'blue', 'pink'],
            colorGuess: ['pink', 'purple', 'purple', 'pink'],
            expect: {
                red: 1,
                white: 0,
            },
        },
        {
            colorCode: ['yellow', 'yellow', 'green', 'green'],
            colorGuess: ['green', 'green', 'green', 'green'],
            expect: {
                red: 2,
                white: 0,
            },
        },
    ];


    /**
     * @param {int} i
     */
    function pegHintsTest(i) {
        const redPegs = colorGuesses[i].expect.red;
        const whitePegs = colorGuesses[i].expect.white;
        const inputColors = colorGuesses[i].colorGuess;
        mastermind.codeToGuess = colorGuesses[i].colorCode;
        const pegHints = mastermind.getKeyPegHintColors(inputColors);

        describe(`code: ${mastermind.codeToGuess} | guess: ${inputColors}`,
            function() {
                it(`should return ${redPegs} red pegs`, function() {
                    assert.equal(pegHints.red, redPegs);
                });
                it(`should return ${whitePegs} white pegs`, function() {
                    assert.equal(pegHints.white, whitePegs);
                });
            },
        );
    }

    describe('#getKeyPegHintColors', function() {
        for (let i = 0; i < colorGuesses.length; i++) {
            pegHintsTest(i);
        }
    });
});
