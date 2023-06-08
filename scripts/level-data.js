import * as blocks from "./code-blocks/code-block-definitions.js";

/**
 * @type {{[level: number]: {[variable: string]: number}}}
 */
export const levelVariables = {
    0: { // test level
        health: 5,
        ammo: 10,
    },
    1: {
        //
    },
    2: {
        //
    },
    3: {
        //
    },
};

/**
 * @type {{[level: number]: {
 *  actions: number,
 *  codeBlocks: number,
 * }}}
 */
export const levelTarget = {
    0: { // test level
        actions: 9,
        codeBlocks: 7,
    },
    1: {
        actions: 3,
        codeBlocks: 3,
    },
    2: {
        actions: 6,
        codeBlocks: 6,
    },
    3: {
        actions: 11,
        codeBlocks: 11,
    }
}

/**
 * @typedef {import('../code-blocks/code-block-definitions.js').CodeBlockDefinition} CodeBlockDefinition
 */

/**
 * @type {{[level: number]: {
 *  commands: CodeBlockDefinition[],
 *  repeatExpressions: CodeBlockDefinition[],
 *  conditionalExpressions: CodeBlockDefinition[],
 * }}}
 */
export const levelAvailableCodeBlocks = {
    0: { // test level
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.shootCommand,
            blocks.forCommand,
            blocks.whileCommand,
            blocks.ifCommand,
            blocks.elseIfCommand,
            blocks.elseCommand,
        ],
        repeatExpressions: [
            blocks.zeroExpression,
            blocks.oneExpression,
            blocks.twoExpression,
            blocks.threeExpression,
            blocks.fourExpression,
            blocks.fiveExpression,
            blocks.sixExpression,
            blocks.sevenExpression,
            blocks.eightExpression,
            blocks.nineExpression,
            blocks.addExpression,
            blocks.subtractExpression,
            blocks.multiplyExpression,
            blocks.divideExpression,
            blocks.moduloExpression,
            blocks.openParenthesisExpression,
            blocks.closeParenthesisExpression,
            blocks.healthExpression,
            blocks.ammoExpression,
            blocks.leftExpression,
            blocks.rightExpression,
            blocks.upExpression,
            blocks.downExpression,
            blocks.upLeftExpression,
            blocks.upRightExpression,
            blocks.downLeftExpression,
            blocks.downRightExpression,
            blocks.centerExpression,
        ],
        conditionalExpressions: [
            blocks.zeroExpression,
            blocks.oneExpression,
            blocks.twoExpression,
            blocks.threeExpression,
            blocks.fourExpression,
            blocks.fiveExpression,
            blocks.sixExpression,
            blocks.sevenExpression,
            blocks.eightExpression,
            blocks.nineExpression,
            blocks.addExpression,
            blocks.subtractExpression,
            blocks.multiplyExpression,
            blocks.divideExpression,
            blocks.moduloExpression,
            blocks.openParenthesisExpression,
            blocks.closeParenthesisExpression,
            blocks.equalExpression,
            blocks.notEqualExpression,
            blocks.greaterExpression,
            blocks.greaterEqualExpression,
            blocks.lessExpression,
            blocks.lessEqualExpression,
            blocks.andExpression,
            blocks.orExpression,
            blocks.notExpression,
            blocks.healthExpression,
            blocks.ammoExpression,
            blocks.leftExpression,
            blocks.rightExpression,
            blocks.upExpression,
            blocks.downExpression,
            blocks.upLeftExpression,
            blocks.upRightExpression,
            blocks.downLeftExpression,
            blocks.downRightExpression,
            blocks.centerExpression,
        ],
    },
    1: {
        commands: [
            blocks.moveForwardCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            //
        ],
    },
    2: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            //
        ],
    },
    3: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            //
        ],
    }
};
