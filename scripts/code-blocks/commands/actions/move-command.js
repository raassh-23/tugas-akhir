import { waitUnlessStopped } from "../../code-block-utils.js";
import BaseCommand from "../base-command.js";

const frameToDirections = ["left", "up", "right", "down"];
const dirAnimationSpeed = {
    "right": 6,
    "down": 0,
    "left": 6,
    "up": 0,
};

/**
 * @extends CodeBlock
 */
export default class MoveCommand extends BaseCommand {
    constructor() {
        super("Move");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        this.runtime.callFunction("OnCommandStart")

        const direction = frameToDirections[this.animationFrame];

		player.behaviors.TileMovement.simulateControl(direction);
        player.setAnimation(direction);
        player.animationSpeed = dirAnimationSpeed[direction];

        return waitUnlessStopped(state, {
            extraCondition: () => player.behaviors.TileMovement.isMoving(),
            afterWait: () => {
                player.animationSpeed = 0;
                state.actionCount++;

                return this.checkCollisions(state);
            },
        });
    }
}
