import BaseCommand from "./base-command.js";
import {waitForMillisecond} from "../utils/misc.js";

/**
 * @extends BaseCommand
 */
export default class NumberCommand extends BaseCommand {
    constructor() {
        super("NumberCommand");
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        //
    }

    evaluate() {
        return this.animationFrame;
    }
}