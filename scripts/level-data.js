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
    }
};

/**
 * @typedef {{
 *  name: string,
 *  frame: number,
 * }} CodeBlockDefinition
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
            {
                name: "MoveCommand",
                frame: 0,
            },
            {
                name: "RotateCommand",
                frame: 0,
            },
            {
                name: "RotateCommand",
                frame: 1,
            },
            {
                name: "ShootCommand",
                frame: 0,
            },
            {
                name: "RepeatCommand",
                frame: 0,
            },
            {
                name: "WhileCommand",
                frame: 0,
            },
            {
                name: "IfCommand",
                frame: 0,
            },
            {
                name: "ElseIfCommand",
                frame: 0,
            },
            {
                name: "ElseCommand",
                frame: 0,
            },
        ],
        repeatExpressions: [
            {
                name: "NumberBlock",
                frame: 0,
            },
            {
                name: "NumberBlock",
                frame: 1,
            },
            {
                name: "NumberBlock",
                frame: 2,
            },
            {
                name: "NumberBlock",
                frame: 3,
            },
            {
                name: "NumberBlock",
                frame: 4,
            },
            {
                name: "NumberBlock",
                frame: 5,
            },
            {
                name: "NumberBlock",
                frame: 6,
            },
            {
                name: "NumberBlock",
                frame: 7,
            },
            {
                name: "NumberBlock",
                frame: 8,
            },
            {
                name: "NumberBlock",
                frame: 9,
            },
            {
                name: "OperatorBlock",
                frame: 0,
            },
            {
                name: "OperatorBlock",
                frame: 1,
            },
            {
                name: "OperatorBlock",
                frame: 2,
            },
            {
                name: "OperatorBlock",
                frame: 3,
            },
            {
                name: "OperatorBlock",
                frame: 4,
            },
            {
                name: "OperatorBlock",
                frame: 5,
            },
            {
                name: "OperatorBlock",
                frame: 6,
            },
            {
                name: "VariableBlock",
                frame: 0,
            },
            {
                name: "VariableBlock",
                frame: 1,
            },
            {
                name: "ReadBlock",
                frame: 0,
            },
            {
                name: "ReadBlock",
                frame: 2,
            },
            {
                name: "ReadBlock",
                frame: 1,
            },
            {
                name: "ReadBlock",
                frame: 3,
            },
            {
                name: "ReadBlock",
                frame: 4,
            },
            {
                name: "ReadBlock",
                frame: 5,
            },
            {
                name: "ReadBlock",
                frame: 7,
            },
            {
                name: "ReadBlock",
                frame: 6,
            },
            {
                name: "ReadBlock",
                frame: 8,
            },
        ],
        conditionalExpressions: [
            {
                name: "NumberBlock",
                frame: 0,
            },
            {
                name: "NumberBlock",
                frame: 1,
            },
            {
                name: "NumberBlock",
                frame: 2,
            },
            {
                name: "NumberBlock",
                frame: 3,
            },
            {
                name: "NumberBlock",
                frame: 4,
            },
            {
                name: "NumberBlock",
                frame: 5,
            },
            {
                name: "NumberBlock",
                frame: 6,
            },
            {
                name: "NumberBlock",
                frame: 7,
            },
            {
                name: "NumberBlock",
                frame: 8,
            },
            {
                name: "NumberBlock",
                frame: 9,
            },
            {
                name: "OperatorBlock",
                frame: 0,
            },
            {
                name: "OperatorBlock",
                frame: 1,
            },
            {
                name: "OperatorBlock",
                frame: 2,
            },
            {
                name: "OperatorBlock",
                frame: 3,
            },
            {
                name: "OperatorBlock",
                frame: 4,
            },
            {
                name: "OperatorBlock",
                frame: 5,
            },
            {
                name: "OperatorBlock",
                frame: 6,
            },
            {
                name: "OperatorBlock",
                frame: 7,
            },
            {
                name: "OperatorBlock",
                frame: 8,
            },
            {
                name: "OperatorBlock",
                frame: 9,
            },
            {
                name: "OperatorBlock",
                frame: 10,
            },
            {
                name: "OperatorBlock",
                frame: 11,
            },
            {
                name: "OperatorBlock",
                frame: 12,
            },
            {
                name: "OperatorBlock",
                frame: 13,
            },
            {
                name: "OperatorBlock",
                frame: 14,
            },
            {
                name: "OperatorBlock",
                frame: 15,
            },
            {
                name: "VariableBlock",
                frame: 0,
            },
            {
                name: "VariableBlock",
                frame: 1,
            },
            {
                name: "ReadBlock",
                frame: 0,
            },
            {
                name: "ReadBlock",
                frame: 2,
            },
            {
                name: "ReadBlock",
                frame: 1,
            },
            {
                name: "ReadBlock",
                frame: 3,
            },
            {
                name: "ReadBlock",
                frame: 4,
            },
            {
                name: "ReadBlock",
                frame: 5,
            },
            {
                name: "ReadBlock",
                frame: 7,
            },
            {
                name: "ReadBlock",
                frame: 6,
            },
            {
                name: "ReadBlock",
                frame: 8,
            },
        ],
    },
    1: {
        commands: [
            {
                name: "MoveCommand",
                frame: 0,
            },
        ],
        repeatExpressions: [
            //
        ],
        conditionalExpressions: [
            //
        ],
    },
};
