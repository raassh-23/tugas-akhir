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
    1: { // test level
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
        repeatExpressions: [],
    },
};
