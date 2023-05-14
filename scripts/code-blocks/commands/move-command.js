import {waitForMilisecond} from "../../utils/misc.js";
import { STOPPED, DURATION, CHECK_INTERVAL } from "../code-block-constants.js";
import BaseCommand from "./base-command.js";

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
     * @param {import("../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const direction = frameToDirections[this.animationFrame];

		player.behaviors.TileMovement.simulateControl(direction);
        player.setAnimation(direction);
        player.animationSpeed = dirAnimationSpeed[direction];

        let totalDuration = 0;

        do {
            if (state.isStopped) {
                return STOPPED;
            }

            totalDuration += CHECK_INTERVAL;
            await waitForMilisecond(CHECK_INTERVAL);
        } while (player.behaviors.TileMovement.isMoving() || totalDuration < DURATION);

        player.animationSpeed = 0;

        state.actionCount++;

        return this.checkCollisions(state);
    }
}
