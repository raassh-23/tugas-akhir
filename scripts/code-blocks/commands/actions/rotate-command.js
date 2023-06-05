import { startCommmand, waitUnlessStopped } from "../../code-block-utils.js";
import BaseCommand from "../base-command.js";

const directions = ["left", "up", "right", "down"];
const rotations = [+1, -1];

/**
 * @extends BaseCommand
 */
export default class RotateCommand extends BaseCommand {
    constructor() {
        super("Rotate");
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

        const rotation = rotations[this.animationFrame];
        const oldAnimation = player.animationName;

        const newAnimation = directions[(directions.indexOf(oldAnimation) + rotation + directions.length) % directions.length];

        player.setAnimation(newAnimation);

        return waitUnlessStopped(state, {
            extraCondition: () => player.behaviors.TileMovement.isMoving(),
            afterWait: () => {
                state.actionCount++;

                return this.checkCollisions(player, state);
            },
        });
    }
}
