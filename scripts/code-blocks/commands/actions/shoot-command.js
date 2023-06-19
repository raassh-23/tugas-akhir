import { translate } from "../../../translations/translations.js";
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
 * @extends BaseCommand
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

        if (this.runtime.globalVars.variableNames.includes("ammo")) {
            if (player.instVars.ammo <= 0) {
                state.isError = true;
                this.showError(true);
                this.runtime.callFunction("ShowError", translate("game.error.no-ammo"), 2);

                return ERROR;
            }

            player.instVars.ammo--;
        }

        const dir = player.animationName;
        const angle = directionToAngle[dir] ?? 0;
        
        this.runtime.callFunction("PlayerShoot", angle);

        return waitUnlessStopped(state, {
            afterWait: () => {
                return this.checkCollisions(player, state);
            },
        });
    }
}
