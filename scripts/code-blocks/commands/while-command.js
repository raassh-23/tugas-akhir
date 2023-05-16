import CommandsContainer from "./commands-container.js";
import {
    MARGIN,
    FINISHED,
    ERROR,
    DURATION,
} from "../code-block-constants.js";
import { getContainerParent, waitForMilisecond } from "../../utils/misc.js";
import RunnerCommand from "./runner-command.js";
import { waitUnlessStopped } from "../code-block-utils.js";

/**
 * @extends CommandsContainer
 */
export default class WhileCommand extends CommandsContainer {
    /**
     * @type {string}
     */
    #repeatCondition = "false";

    /**
     * @type {IWorldInstance?}
     */
    background = null;

    /**
     * @type {ITextInstance?}
     */
    text = null;

    /**
     * @type {ISpriteInstance}
     */
    icon = null;

    /**
     * @type {IWorldInstance}
     */
    popUpButton = null;

    constructor() {
        super("While");

        for (const child of this.children()) {
            if (child.objectType.name === "NestedCodeBlockBackground") {
                this.background = child;
                continue;
            }

            if (child.objectType.name === "CodeBlockText") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.text = child;
                this.text.text = this.#repeatCondition;
                continue;
            }

            if (child.objectType.name === "CodeBlockDecoration") {
                if (child.instVars.id === "while-icon") {
                    this.icon = child;
                }

                if (child.instVars.id === "while-pop-up") {
                    this.popUpButton = child;
                }

                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.highlightedObjects.push(child);
            }
        }
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const cleanedCondition = this.#repeatCondition
            .replace(/&/g, 'and')
            .replace(/\|/g, 'or')
            .replace(/!/g, 'not')
            .replace(/%/g, 'mod')
            .replace(/x/g, '*');

        while (true) {
            let evaluatedCondition = false;

            try {
                evaluatedCondition = math.evaluate(cleanedCondition, state.variables);
                evaluatedCondition = !!evaluatedCondition; // convert to boolean
            } catch (error) {
                state.isError = true;
                this.showError(true);
    
                return ERROR
            }
            
            this.showHighlight(true);
            this.text.text = evaluatedCondition.toString();

            const waitResult = await waitUnlessStopped(state, {
                afterWait: () => {
                    this.showHighlight(false);

                    return this.checkCollisions(state);
                },
            });

            if (waitResult !== FINISHED) {
                return waitResult;
            }

            if (!evaluatedCondition) {
                break;
            }

            const result = await super.run(player, state);

            if (result !== FINISHED) {
                return result;
            }
        }

        return FINISHED;
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width = 0, shiftLastCommand = false) {
        const oldWidth = this.width;
        const commands = this.container.codeBlocks;

        this.width = this.getWidthOnLevel(this.level) + width;

        this.codeBlockShadows[1].x = this.x + this.width;

        if (this.width < oldWidth && shiftLastCommand) {
            const lastCommand = commands[commands.length - 1];
            if (lastCommand != null) {
                lastCommand.x = this.x + this.width - lastCommand.width - MARGIN;
                lastCommand.instVars.savedX = lastCommand.x;
            }
        }

        const parent = getContainerParent(this);

        if (parent != null && !(parent instanceof RunnerCommand)) {
            parent.expand(width, false);
        }
    }

    /**
     * 
     * @param {string} condition
     */
    setRepeatCondition(condition) {
        if (condition === this.#repeatCondition) {
            return;
        } else if (condition.length === 0) {
            this.#repeatCondition = "false";
        } else {
            this.#repeatCondition = condition;
        }

        this.showError(false);
        this.text.text = this.#repeatCondition.replace(/ /g, '');
    }

    setSizeBasedOnLevel() {
        const multiplier = this.getMultiplier(this.level);

        this.icon.width = this.icon.savedWidth * multiplier;
        this.icon.height = this.icon.savedHeight * multiplier;

        this.height = this.savedHeight * multiplier;
        this.width = this.getWidthOnLevel(this.level);

        this.popUpButton.x = this.x + this.icon.width - this.popUpButton.width / 2 - 10 * multiplier;
        this.popUpButton.y = this.y + 45 * multiplier;

        this.text.x = this.popUpButton.x;
        this.text.y = this.popUpButton.y;

        let currentX = this.x + this.icon.width + MARGIN;
        this.container.codeBlocks.forEach((command) => {
            command.x = currentX;
            currentX += command.width;
        });

        this.codeBlockShadows[0].x = this.x + this.icon.width + MARGIN;
        this.codeBlockShadows[0].height = this.savedHeight * this.getMultiplier(this.level + 1);

        this.codeBlockShadows[1].x = this.x + this.width;
        this.codeBlockShadows[1].height = this.height;
    }

    /**
     * 
     * @param {number} level 
     * @returns {number}
     */
    getWidthOnLevel(level) {
        const childWidth = this.container.codeBlocks.reduce((acc, command) => {
            return acc + command.getWidthOnLevel(level + 1);
        }, 0);

        const multiplier = this.getMultiplier(level);

        const offsetStart = this.icon.savedWidth * multiplier;

        const finalWidth = 2 * MARGIN + offsetStart + childWidth;

        return finalWidth;
    }

    /**
     * 
     * @param {boolean} show 
     */
    showError(show) {
        for (const child of this.highlightedObjects) {
            if (child.instVars.id === "while-icon") {
                child.animationFrame = show ? 1 : 0;
                continue;
            }

            if (child.instVars.id === "while-pop-up") {
                child.animationFrame = show ? 3 : 2;
            }
        }
    }

    reset(withError) {
        this.text.text = this.#repeatCondition.replace(/ /g, '');

        super.reset(withError);
    }
}
