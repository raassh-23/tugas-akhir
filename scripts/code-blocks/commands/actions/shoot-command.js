import { ERROR } from "../../code-block-constants.js";
import { startCommmand, waitUnlessStopped } from "../../code-block-utils.js";
import BaseCommand from "../base-command.js";

const directionToAngle = {
    "right": 0,
    "down": 90,
    "left": 180,
    "up": 270,
}

/**
 * @extends CodeBlock
 */
export default class ShootCommand extends BaseCommand {
    constructor() {
        super("Shoot");
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

        if (state.variables.ammo != undefined) {
            if (state.variables.ammo <= 0) {
                state.isError = true;
                this.showError(true);
                return ERROR;
            }

            state.variables.ammo--;
        }

        const dir = player.animationName;
        const angle = directionToAngle[dir] ?? 0;
        
        this.runtime.callFunction("PlayerShoot", angle);

        return waitUnlessStopped(state, {
            afterWait: () => {
                state.actionCount++;

                return this.checkCollisions(state);
            },
        });
    }
}
