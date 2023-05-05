import {waitForMillisecond} from "../../utils/misc.js";
import { STOPPED, FINISHED } from "../code-block-constants.js";
import BaseCommand from "./base-command.js";

const maxDuration = 750;
const directions = ["left", "up", "right", "down"];
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
     * @param {import("../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const direction = directions[this.animationFrame];

		player.behaviors.TileMovement.simulateControl(direction);
        player.setAnimation(direction);
        player.animationSpeed = dirAnimationSpeed[direction];

        let totalDuration = 0;

        do {
            if (state.isStopped) {
                return STOPPED;
            }

            totalDuration += 50;
            await waitForMillisecond(50);
        } while (player.behaviors.TileMovement.isMoving() || totalDuration < maxDuration);

        player.animationSpeed = 0;

        state.actionCount++;

        return FINISHED;
    }
}
