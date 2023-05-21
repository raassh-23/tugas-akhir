import IfCommand from "./if-command.js";

/**
 * @extends IfCommand
 */
export default class ElseIfCommand extends IfCommand {
    constructor() {
        super("Elif");
    }
}
