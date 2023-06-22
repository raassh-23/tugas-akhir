import * as blocks from "../code-blocks/code-block-definitions.js";

/**
 * 
 * @typedef {import('../code-blocks/code-block-definitions.js').CodeBlockDefinition} CodeBlockDefinition
 * 
 * @type {{[level: number]: {
 *  commands: CodeBlockDefinition[],
 *  repeatExpressions: CodeBlockDefinition[],
 *  conditionalExpressions: CodeBlockDefinition[],
 * }}}
 */
const levelAvailableCodeBlocks = {
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
            blocks.takeGemCommand,
        ],
        repeatExpressions: [
            //
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
            blocks.takeGemCommand,
        ],
        repeatExpressions: [
            //
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
            blocks.takeGemCommand,
        ],
        repeatExpressions: [
            //
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
        ],
        repeatExpressions: [
            //
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
            blocks.ifCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
        ],
    },
    10: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
        ],
    },
    11: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
            blocks.healthExpression,
        ],
    },
    12: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
            blocks.healthExpression,
        ],
    },
    13: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
            blocks.healthExpression,
            blocks.centerExpression,
        ],
    },
    14: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
            blocks.healthExpression,
            blocks.centerExpression,
            blocks.leftExpression,
            blocks.rightExpression,
            blocks.upExpression,
            blocks.downExpression,
            blocks.upLeftExpression,
            blocks.upRightExpression,
            blocks.downLeftExpression,
            blocks.downRightExpression,
        ],
    },
    15: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
            blocks.elseCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
            blocks.healthExpression,
            blocks.centerExpression,
            blocks.leftExpression,
            blocks.rightExpression,
            blocks.upExpression,
            blocks.downExpression,
            blocks.upLeftExpression,
            blocks.upRightExpression,
            blocks.downLeftExpression,
            blocks.downRightExpression,
        ],
    },
    16: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
            blocks.elseCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
            blocks.healthExpression,
            blocks.centerExpression,
            blocks.leftExpression,
            blocks.rightExpression,
            blocks.upExpression,
            blocks.downExpression,
            blocks.upLeftExpression,
            blocks.upRightExpression,
            blocks.downLeftExpression,
            blocks.downRightExpression,
        ],
    },
    17: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
            blocks.elseCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
            blocks.healthExpression,
            blocks.centerExpression,
            blocks.leftExpression,
            blocks.rightExpression,
            blocks.upExpression,
            blocks.downExpression,
            blocks.upLeftExpression,
            blocks.upRightExpression,
            blocks.downLeftExpression,
            blocks.downRightExpression,
            blocks.equalExpression,
            blocks.zeroExpression,
            blocks.oneExpression,
            blocks.twoExpression,
            blocks.threeExpression,
        ],
    },
    18: {
        commands: [
            blocks.moveForwardCommand,
            blocks.rotateClockwiseCommand,
            blocks.rotateCounterClockwiseCommand,
            blocks.takeGemCommand,
            blocks.ifCommand,
            blocks.elseCommand,
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            blocks.gemExpression,
            blocks.healthExpression,
            blocks.centerExpression,
            blocks.leftExpression,
            blocks.rightExpression,
            blocks.upExpression,
            blocks.downExpression,
            blocks.upLeftExpression,
            blocks.upRightExpression,
            blocks.downLeftExpression,
            blocks.downRightExpression,
            blocks.equalExpression,
            blocks.notEqualExpression,
            blocks.greaterExpression,
            blocks.greaterEqualExpression,
            blocks.lessExpression,
            blocks.lessEqualExpression,
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
    },
};

export default levelAvailableCodeBlocks;