import CommandsContainer from "./commands-container.js";

const offsetLength = 96;

/**
 * @extends CommandsContainer
 */
export default class RepeatCommand extends CommandsContainer {
    /**
     * @type {number}
     */
    #repeatCount = 0;

    /**
     * @type {number}
     */
    minLength = 0;

    /**
     * @type {?ISpriteInstance}
     */
    childToBeShift = null;

    /**
     * @type {?IWorldInstance}
     */
    background = null;

    /**
     * @type {?ITextInstance}
     */
	text = null;

    constructor() {
        super("Repeat");

        this.minLength = this.width;

        for (const child of this.children()) {
            if (child.instVars?.shouldShift) {
                this.childToBeShift = child;
                continue;
            }

            if (child.objectType.name === "NestedCodeBlockBackground") {
                this.background = child;
				continue;
            }

            if (child.objectType.name === "CodeBlockText") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.text = child;
                this.text.text = this.#repeatCount.toString();
                continue;
            }

            if (child.objectType.name === "CodeBlockDecoration") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.highlightedObjects.push(child);
            }
        }
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        for (let i = 0; i < this.#repeatCount; i++) {
            this.text.text = (this.#repeatCount - i - 1).toString();

            await super.run(player);
        }

        this.text.text = this.#repeatCount.toString();
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width) {
        const oldWidth = this.width;
        const commands = this.container.codeBlocks;

        const newWidth = 2 * this.runtime.globalVars.ACTIVE_COMMAND_MARGIN + offsetLength + width
            + commands.reduce((acc, command) => acc + command.width, 0);

        if (newWidth <= this.minLength) {
            this.width = this.minLength;
        } else {
            this.width = newWidth;
        }

        this.childToBeShift.x = this.x + this.width;
        
        if (this.width < oldWidth) {
            const lastCommand = commands[commands.length - 1];
            if (lastCommand != null) {
                lastCommand.x = this.x + this.width - lastCommand.width - this.runtime.globalVars.ACTIVE_COMMAND_MARGIN;
                lastCommand.instVars.savedX = lastCommand.x;
            }
        }
    }

    /**
     * 
     * @param {number} count must be greater or equal than 0, float will be rounded down
     */
    setRepeatCount(count) {
		if (isNaN(count)) {
            throw new Error("count must be number");
		}
		
        if (count < 0) {
            throw new Error("count must be greater or equal than 0");
        }

        this.#repeatCount = Math.floor(count);
        this.text.text = this.#repeatCount.toString();
    }
	
	getRepeatCount() {
		return this.#repeatCount;
	}

    /**
     * 
     * @param {[number, number, number]} color 
     */
    setColor(color) {
        super.setColor(color);
        this.background.colorRgb = color;
    }

    setSizeBasedOnLevel() {
        super.setSizeBasedOnLevel();

        const multiplier = this.level < 5 ? 0.9 ** (this.level - 1) : 0.9 ** 4;

        this.highlightedObjects.forEach((object) => {
            object.width = object.savedWidth * multiplier;
            object.height = object.savedHeight * multiplier;
        });

        this.text.width = this.text.savedWidth * multiplier;
        this.text.height = this.text.savedHeight * multiplier;
    }
}
