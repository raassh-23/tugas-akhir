/**
 * @typedef {{
*  name: string,
*  frame: number,
* }} CodeBlockDefinition
*/

/**************
 ** COMMANDS **
 **************/

/** @type {CodeBlockDefinition} */
export const moveForwardCommand = {
    name: "MoveCommand",
    frame: 0,
}

/** @type {CodeBlockDefinition} */
export const rotateClockwiseCommand = {
    name: "RotateCommand",
    frame: 0,
}

/** @type {CodeBlockDefinition} */
export const rotateCounterClockwiseCommand = {
    name: "RotateCommand",
    frame: 1,
}

/** @type {CodeBlockDefinition} */
export const shootCommand = {
    name: "ShootCommand",
    frame: 0,
}

/** @type {CodeBlockDefinition} */
export const forCommand = {
    name: "RepeatCommand",
    frame: 0,
}

/** @type {CodeBlockDefinition} */
export const whileCommand = {
    name: "WhileCommand",
    frame: 0,
}

/** @type {CodeBlockDefinition} */
export const ifCommand = {
    name: "IfCommand",
    frame: 0,
}

/** @type {CodeBlockDefinition} */
export const elseIfCommand = {
    name: "ElseIfCommand",
    frame: 0,
}

/** @type {CodeBlockDefinition} */
export const elseCommand = {
    name: "ElseCommand",
    frame: 0,
}

/*****************
 ** EXPRESSIONS **
 *****************/

/** @type {CodeBlockDefinition} */
export const zeroExpression = {
    name: "NumberBlock",
    frame: 0,
};

/** @type {CodeBlockDefinition} */
export const oneExpression = {
    name: "NumberBlock",
    frame: 1,
};

/** @type {CodeBlockDefinition} */
export const twoExpression = {
    name: "NumberBlock",
    frame: 2,
};

/** @type {CodeBlockDefinition} */
export const threeExpression = {
    name: "NumberBlock",
    frame: 3,
};

/** @type {CodeBlockDefinition} */
export const fourExpression = {
    name: "NumberBlock",
    frame: 4,
};

/** @type {CodeBlockDefinition} */
export const fiveExpression = {
    name: "NumberBlock",
    frame: 5,
};

/** @type {CodeBlockDefinition} */
export const sixExpression = {
    name: "NumberBlock",
    frame: 6,
};

/** @type {CodeBlockDefinition} */
export const sevenExpression = {
    name: "NumberBlock",
    frame: 7,
};

/** @type {CodeBlockDefinition} */
export const eightExpression = {
    name: "NumberBlock",
    frame: 8,
};

/** @type {CodeBlockDefinition} */
export const nineExpression = {
    name: "NumberBlock",
    frame: 9,
};

/** @type {CodeBlockDefinition} */
export const addExpression = {
    name: "OperatorBlock",
    frame: 0,
};

/** @type {CodeBlockDefinition} */
export const subtractExpression = {
    name: "OperatorBlock",
    frame: 1,
};

/** @type {CodeBlockDefinition} */
export const multiplyExpression = {
    name: "OperatorBlock",
    frame: 2,
};

/** @type {CodeBlockDefinition} */
export const divideExpression = {
    name: "OperatorBlock",
    frame: 3,
};

/** @type {CodeBlockDefinition} */
export const moduloExpression = {
    name: "OperatorBlock",
    frame: 4,
};

/** @type {CodeBlockDefinition} */
export const openParenthesisExpression = {
    name: "OperatorBlock",
    frame: 5,
};

/** @type {CodeBlockDefinition} */
export const closeParenthesisExpression = {
    name: "OperatorBlock",
    frame: 6,
};

/** @type {CodeBlockDefinition} */
export const equalExpression = {
    name: "OperatorBlock",
    frame: 7,
};

/** @type {CodeBlockDefinition} */
export const notEqualExpression = {
    name: "OperatorBlock",
    frame: 8,
};

/** @type {CodeBlockDefinition} */
export const greaterExpression = {
    name: "OperatorBlock",
    frame: 9,
};

/** @type {CodeBlockDefinition} */
export const greaterEqualExpression = {
    name: "OperatorBlock",
    frame: 10,
};

/** @type {CodeBlockDefinition} */
export const lessExpression = {
    name: "OperatorBlock",
    frame: 11,
};

/** @type {CodeBlockDefinition} */
export const lessEqualExpression = {
    name: "OperatorBlock",
    frame: 12,
};

/** @type {CodeBlockDefinition} */
export const andExpression = {
    name: "OperatorBlock",
    frame: 13,
};

/** @type {CodeBlockDefinition} */
export const orExpression = {
    name: "OperatorBlock",
    frame: 14,
};

/** @type {CodeBlockDefinition} */
export const notExpression = {
    name: "OperatorBlock",
    frame: 15,
};

/** @type {CodeBlockDefinition} */
export const healthExpression = {
    name: "VariableBlock",
    frame: 0,
};

/** @type {CodeBlockDefinition} */
export const ammoExpression = {
    name: "VariableBlock",
    frame: 1,
};

/** @type {CodeBlockDefinition} */
export const leftExpression = {
    name: "ReadBlock",
    frame: 0,
};

/** @type {CodeBlockDefinition} */
export const upExpression = {
    name: "ReadBlock",
    frame: 1,
};

/** @type {CodeBlockDefinition} */
export const rightExpression = {
    name: "ReadBlock",
    frame: 2,
};

/** @type {CodeBlockDefinition} */
export const downExpression = {
    name: "ReadBlock",
    frame: 3,
};

/** @type {CodeBlockDefinition} */
export const upLeftExpression = {
    name: "ReadBlock",
    frame: 4,
};

/** @type {CodeBlockDefinition} */
export const upRightExpression = {
    name: "ReadBlock",
    frame: 5,
};

/** @type {CodeBlockDefinition} */
export const downRightExpression = {
    name: "ReadBlock",
    frame: 6,
};

/** @type {CodeBlockDefinition} */
export const downLeftExpression = {
    name: "ReadBlock",
    frame: 7,
};

/** @type {CodeBlockDefinition} */
export const centerExpression = {
    name: "ReadBlock",
    frame: 8,
};
