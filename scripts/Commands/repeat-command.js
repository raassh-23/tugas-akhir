import ContainerCommand from "./container-command.js";

const offsetLength = 96;

/**
 * @extends ContainerCommand
 */
export default class RepeatCommand extends ContainerCommand {
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

            if (child.objectType.name === "NestedCommandBackground") {
                this.background = child;
				continue;
            }

            if (child.objectType.name === "CommandText") {
                this.text = child;
                this.text.text = this.#repeatCount.toString();
            }
        }
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        for (let i = 0; i < this.#repeatCount; i++) {
            await super.run(player);
        }
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width) {
        const oldWidth = this.width;

        const newWidth = 2 * this.runtime.globalVars.ACTIVE_COMMAND_MARGIN + offsetLength + width
            + this.commands.reduce((acc, command) => acc + command.width, 0);

        if (newWidth <= this.minLength) {
            this.width = this.minLength;
        } else {
            this.width = newWidth;
        }

        this.childToBeShift.x = this.x + this.width;
        
        if (this.width < oldWidth) {
            const lastCommand = this.commands[this.commands.length - 1];
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
}