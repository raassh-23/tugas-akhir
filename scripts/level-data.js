import * as blocks from "./code-blocks/code-block-definitions.js";

/**
 * @type {{[level: number]: string[]}}
 */
export const levelVariables = {
    0: ["health", "ammo", "gem"],// test level
    1: [/* */],
    2: [/* */],
    3: [/* */],
    4: [/* */],
    5: [/* */],
    6: [/* */],
    7: [/* */],
    8: ["gem"],
    9: ["gem"],
    10: ["gem"],
    11: ["gem"],
    12: ["gem"],
    13: ["gem"],
    14: ["gem"],
    15: ["gem", "health"],
    16: ["gem", "health"],
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
        actions: 6,
        codeBlocks: 6,
    },
    4: {
        actions: 11,
        codeBlocks: 11,
    },
    5: {
        actions: 4,
        codeBlocks: 2,
    },
    6: {
        actions: 11,
        codeBlocks: 8,
    },
    7: {
        actions: 19,
        codeBlocks: 11,
    },
    8: {
        actions: 5,
        codeBlocks: 7,
    },
    9: {
        actions: 16,
        codeBlocks: 9,
    },
    10: {
        actions: 20,
        codeBlocks: 9,
    },
    11: {
        actions: 23,
        codeBlocks: 3,
    },
    12: {
        actions: 36,
        codeBlocks: 7,
    },
    13: {
        actions: 30,
        codeBlocks: 7,
    },
    14: {
        actions: 33,
        codeBlocks: 6,
    },
    15: {
        actions: 37,
        codeBlocks: 11,
    },
    16: {
        actions: 36,
        codeBlocks: 6,
    },
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
            blocks.takeGemCommand,
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
            blocks.gemExpression,
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
            blocks.gemExpression,
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
    },
    4: {
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
    },
    5: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.forCommand,
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
        ],
        conditionalExpressions: [
            //
        ],
    },
    6: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.forCommand,
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
        ],
        conditionalExpressions: [
            //
        ],
    },
    7: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.forCommand,
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
        ],
        conditionalExpressions: [
            //
        ],
    },
    8: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
        ],
        conditionalExpressions: [
            //
        ],
    },
    9: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
            blocks.gemExpression,
        ],
        conditionalExpressions: [
            //
        ],
    },
    10: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
            blocks.gemExpression,
        ],
        conditionalExpressions: [
            //
        ],
    },
    11: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
            blocks.gemExpression,
        ],
        conditionalExpressions: [
            //
        ],
    },
    12: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
            blocks.gemExpression,
        ],
        conditionalExpressions: [
            //
        ],
    },
    13: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
            blocks.gemExpression,
            blocks.centerExpression,
        ],
        conditionalExpressions: [
            //
        ],
    },
    14: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
            blocks.gemExpression,
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
            //
        ],
    },
    15: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
            blocks.gemExpression,
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
            //
        ],
    },
    16: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.forCommand,
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
            blocks.gemExpression,
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
            //
        ],
    },
};
