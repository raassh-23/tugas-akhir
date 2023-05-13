import CommandsContainer from "./commands-container.js";
import {
    MARGIN,
    FINISHED,
    ERROR,
    DURATION,
} from "../code-block-constants.js";
import { getContainerParent, waitForMilisecond } from "../../utils/misc.js";
import RunnerCommand from "./runner-command.js";

/**
 * @extends CommandsContainer
 */
export default class RepeatCommand extends CommandsContainer {
    /**
     * @type {string}
     */
    #repeatCondition = "0";

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
    repeatPopUp = null;

    constructor() {
        super("Repeat");

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
                if (child.instVars.id === "repeat-icon") {
                    this.icon = child;
                }

                if (child.instVars.id === "repeat-pop-up") {
                    this.repeatPopUp = child;
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
     * @param {import("../../for-events.js").GameState}} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        try {
            const cleanedRepeatCondition = this.#repeatCondition
                .replace(/%/g, 'mod')
                .replace(/x/g, '*');
            const repeatCount = math.evaluate(cleanedRepeatCondition, state.variables);
            this.text.text = repeatCount.toString();

            let i = 0;
            while (true) {
                this.showHighlight(true);
                this.text.text = (repeatCount - i).toString();
                
                await waitForMilisecond(DURATION);

                this.showHighlight(false);

                if (repeatCount <= i++) {
                    break;
                }

                const result = await super.run(player, state);

                if (result !== FINISHED) {
                    return result;
                }
            }
        } catch (error) {
            console.log(error);
            this.showError(true);

            return ERROR
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
            this.#repeatCondition = "0";
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

        this.repeatPopUp.x = this.x + this.icon.width - this.repeatPopUp.width / 2 - 10 * multiplier;
        this.repeatPopUp.y = this.y + 45 * multiplier;

        this.text.x = this.repeatPopUp.x;
        this.text.y = this.repeatPopUp.y;

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
            if (child.instVars.id === "repeat-icon") {
                child.animationFrame = show ? 1 : 0;
                continue;
            }

            if (child.instVars.id === "repeat-pop-up") {
                child.animationFrame = show ? 3 : 2;
            }
        }
    }

    reset(withError) {
        this.text.text = this.#repeatCondition.replace(/ /g, '');

        super.reset(withError);
    }
}
