import { startCommmand, waitUnlessStopped } from "../../code-block-utils.js";
import BaseCommand from "../base-command.js";

const dirAnimationSpeed = {
    "right": 6,
    "down": 0,
    "left": 6,
    "up": 0,
};

/**
 * @extends BaseCommand
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
        startCommmand(this.runtime, player, state);

        const direction = player.animationName;

		player.behaviors.TileMovement.simulateControl(direction);
        player.animationSpeed = dirAnimationSpeed[direction];

        return waitUnlessStopped(state, {
            extraCondition: () => player.behaviors.TileMovement.isMoving(),
            afterWait: () => {
                player.animationSpeed = 0;

                return this.checkCollisions(player, state);
            },
        });
    }
}
