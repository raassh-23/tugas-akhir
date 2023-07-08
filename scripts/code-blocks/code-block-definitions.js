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
export const takeGemCommand = {
    name: "TakeGemCommand",
    frame: 0,
}

/** @type {CodeBlockDefinition} */
export const forCommand = {
    name: "ForCommand",
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
    name: "NumberExpression",
    frame: 0,
};

/** @type {CodeBlockDefinition} */
export const oneExpression = {
    name: "NumberExpression",
    frame: 1,
};

/** @type {CodeBlockDefinition} */
export const twoExpression = {
    name: "NumberExpression",
    frame: 2,
};

/** @type {CodeBlockDefinition} */
export const threeExpression = {
    name: "NumberExpression",
    frame: 3,
};

/** @type {CodeBlockDefinition} */
export const fourExpression = {
    name: "NumberExpression",
    frame: 4,
};

/** @type {CodeBlockDefinition} */
export const fiveExpression = {
    name: "NumberExpression",
    frame: 5,
};

/** @type {CodeBlockDefinition} */
export const sixExpression = {
    name: "NumberExpression",
    frame: 6,
};

/** @type {CodeBlockDefinition} */
export const sevenExpression = {
    name: "NumberExpression",
    frame: 7,
};

/** @type {CodeBlockDefinition} */
export const eightExpression = {
    name: "NumberExpression",
    frame: 8,
};

/** @type {CodeBlockDefinition} */
export const nineExpression = {
    name: "NumberExpression",
    frame: 9,
};

/** @type {CodeBlockDefinition} */
export const addExpression = {
    name: "OperatorExpression",
    frame: 0,
};

/** @type {CodeBlockDefinition} */
export const subtractExpression = {
    name: "OperatorExpression",
    frame: 1,
};

/** @type {CodeBlockDefinition} */
export const multiplyExpression = {
    name: "OperatorExpression",
    frame: 2,
};

/** @type {CodeBlockDefinition} */
export const divideExpression = {
    name: "OperatorExpression",
    frame: 3,
};

/** @type {CodeBlockDefinition} */
export const moduloExpression = {
    name: "OperatorExpression",
    frame: 4,
};

/** @type {CodeBlockDefinition} */
export const openParenthesisExpression = {
    name: "OperatorExpression",
    frame: 5,
};

/** @type {CodeBlockDefinition} */
export const closeParenthesisExpression = {
    name: "OperatorExpression",
    frame: 6,
};

/** @type {CodeBlockDefinition} */
export const equalExpression = {
    name: "OperatorExpression",
    frame: 7,
};

/** @type {CodeBlockDefinition} */
export const notEqualExpression = {
    name: "OperatorExpression",
    frame: 8,
};

/** @type {CodeBlockDefinition} */
export const greaterExpression = {
    name: "OperatorExpression",
    frame: 9,
};

/** @type {CodeBlockDefinition} */
export const greaterEqualExpression = {
    name: "OperatorExpression",
    frame: 10,
};

/** @type {CodeBlockDefinition} */
export const lessExpression = {
    name: "OperatorExpression",
    frame: 11,
};

/** @type {CodeBlockDefinition} */
export const lessEqualExpression = {
    name: "OperatorExpression",
    frame: 12,
};

/** @type {CodeBlockDefinition} */
export const andExpression = {
    name: "OperatorExpression",
    frame: 13,
};

/** @type {CodeBlockDefinition} */
export const orExpression = {
    name: "OperatorExpression",
    frame: 14,
};

/** @type {CodeBlockDefinition} */
export const notExpression = {
    name: "OperatorExpression",
    frame: 15,
};

/** @type {CodeBlockDefinition} */
export const healthExpression = {
    name: "VariableExpression",
    frame: 0,
};

/** @type {CodeBlockDefinition} */
export const ammoExpression = {
    name: "VariableExpression",
    frame: 1,
};

/** @type {CodeBlockDefinition} */
export const gemExpression = {
    name: "VariableExpression",
    frame: 2,
};

/** @type {CodeBlockDefinition} */
export const leftExpression = {
    name: "ReadExpression",
    frame: 0,
};

/** @type {CodeBlockDefinition} */
export const upExpression = {
    name: "ReadExpression",
    frame: 1,
};

/** @type {CodeBlockDefinition} */
export const rightExpression = {
    name: "ReadExpression",
    frame: 2,
};

/** @type {CodeBlockDefinition} */
export const downExpression = {
    name: "ReadExpression",
    frame: 3,
};

/** @type {CodeBlockDefinition} */
export const upLeftExpression = {
    name: "ReadExpression",
    frame: 4,
};

/** @type {CodeBlockDefinition} */
export const upRightExpression = {
    name: "ReadExpression",
    frame: 5,
};

/** @type {CodeBlockDefinition} */
export const downRightExpression = {
    name: "ReadExpression",
    frame: 6,
};

/** @type {CodeBlockDefinition} */
export const downLeftExpression = {
    name: "ReadExpression",
    frame: 7,
};

/** @type {CodeBlockDefinition} */
export const centerExpression = {
    name: "ReadExpression",
    frame: 8,
};
