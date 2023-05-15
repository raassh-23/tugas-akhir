/**
 * @type {{[level: number]: {[variable: string]: number}}}
 */
export const levelVariables = {
    0: { // test level
        health: 5,
        ammo: 10,
    },
};

/**
 * @typedef {{
 *  name: string,
 *  frame: number,
 *  inactiveLayer: string,
 *  panelId: string,
 * }} CodeBlockDefinition
 */

/**
 * @type {{[level: number]: {
 *  commands: CodeBlockDefinition[],
 *  repeatExpressions: CodeBlockDefinition[],
 * }}}
 */
export const levelAvailableCodeBlocks = {
    0: { // test level
        commands: [
            {
                name: "MoveCommand",
                frame: 0,
                inactiveLayer: "UI",
                panelId: "active-commands-panel",
            },
            {
                name: "MoveCommand",
                frame: 1,
                inactiveLayer: "UI",
                panelId: "active-commands-panel",
            },
            {
                name: "MoveCommand",
                frame: 2,
                inactiveLayer: "UI",
                panelId: "active-commands-panel",
            },
            {
                name: "MoveCommand",
                frame: 3,
                inactiveLayer: "UI",
                panelId: "active-commands-panel",
            },
            {
                name: "RepeatCommand",
                frame: 0,
                inactiveLayer: "UI",
                panelId: "active-commands-panel",
            },
            {
                name: "ShootCommand",
                frame: 0,
                inactiveLayer: "UI",
                panelId: "active-commands-panel",
            },
        ],
        repeatExpressions: [
            {
                name: "NumberBlock",
                frame: 0,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 1,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 2,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 3,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 4,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 5,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 6,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 7,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 8,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "NumberBlock",
                frame: 9,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "OperatorBlock",
                frame: 0,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "OperatorBlock",
                frame: 1,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "OperatorBlock",
                frame: 2,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "OperatorBlock",
                frame: 3,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "OperatorBlock",
                frame: 4,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "OperatorBlock",
                frame: 5,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "OperatorBlock",
                frame: 6,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "VariableBlock",
                frame: 0,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
            {
                name: "VariableBlock",
                frame: 1,
                inactiveLayer: "RepeatPopUp",
                panelId: "",
            },
        ],
    },
};
