/**
 * @typedef {import('../code-blocks/index.js').CommandsContainer} CommandsContainer
 * @typedef {import('../code-blocks/index.js').ExpressionsContainer} ExpressionsContainer
 */

/**
 * 
 * @param {Number} ms 
 * @returns {Promise} Promise that resolves after ms milliseconds
 */
export function waitForMilisecond(ms) { 
	return new Promise(res => setTimeout(res, ms)); 
}

/**
 * 
 * @param {IWorldInstance} a 
 * @param {IWorldInstance} b 
 * @returns {number} squared distance between a and b
 */
export function getSquaredDistance(a, b) {
	return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}

/**
 * 
 * @param {ISpriteInstance} sprite 
 * @returns {(CommandsContainer | ExpressionsContainer)?}
 */
export function getContainerParent(sprite) {
	let parent = sprite.getParent();

	while (parent != null && typeof parent.container === 'undefined') {
		parent = parent.getParent();
	}

	return parent;
}

/**
 * 
 * @param {ISpriteInstance} sprite 
 * @returns {(CommandsContainer | ExpressionsContainer)?}
 */
export function getTopCodeBlockContainer(sprite) {
	let parent = getContainerParent(sprite);

	if (parent == null) {
		return null;
	}

	let grandParent = getContainerParent(parent);

	while (grandParent != null) {
		parent = grandParent;
		grandParent = getContainerParent(parent);
	}

	return parent;
}

/**
 * 
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

/**
 * 
 * @param {IObjectClass} object 
 * @param {string} id 
 * 
 * @returns {IWorldInstance?}
 */
export function getInstanceById(object, id) {
	return object.getAllInstances()
		.find(instance => instance.instVars.id === id);
}

/**
 * 
 * @param {IObjectClass<ICodeBlockButton>} codeBlockButtonObject 
 * @param {string} layer 
 * @param {number} x 
 * @param {number} y 
 * @param {import('../level-data.js').CodeBlockDefinition} definition 
 * @param {IWorldInstance} parent 
 */
export function createCodeBlockButton(codeBlockButtonObject, layer, x, y, definition, parent) {
	const button = codeBlockButtonObject.createInstance(layer, x, y);

	button.setAnimation(definition.name);
	button.animationFrame = definition.frame;

	button.instVars.panelId = definition.panelId;
	button.instVars.inactiveLayer = definition.inactiveLayer;

	parent.addChild(button, {
		transformX: true,
		transformY: true,
	})
}

const AVAILABLE_COMMANDS_MARGIN = 16;
const COMMAND_WIDTH = 96;
const COMMAND_HEIGHT = 96;

export function setupCommands(codeBlockButtonObject, parent, definitions) {
	const layer = parent.layer.name;
	const minLength = parent.instVars.initialLength;
	const x = parent.x + (parent.width - COMMAND_WIDTH)/2;
	let y = parent.y + 3 * AVAILABLE_COMMANDS_MARGIN + COMMAND_HEIGHT/2;

	for (const command of definitions) {
		createCodeBlockButton(
			codeBlockButtonObject,
			layer,
			x,
			y,
			command,
			parent,
		);

		y += COMMAND_HEIGHT + AVAILABLE_COMMANDS_MARGIN;
	}

	parent.height = Math.max(minLength, y - parent.y - AVAILABLE_COMMANDS_MARGIN);
	parent.instVars.min = parent.y - (parent.height - minLength);
}

const AVAILABLE_EXPRESSION_MARGIN = 16;
const EXPRESSION_WIDTH = 72;
const EXPRESSION_HEIGHT = 72;

/**
 * 
 * @param {IObjectClass<ICodeBlockButton>} codeBlockButtonObject
 * @param {IWorldInstance} parent 
 * @param {string} layer 
 * @param {import("./level-data.js").CodeBlockDefinition[]} definitions 
 */
export function setupExpressions(codeBlockButtonObject, parent, definitions) {
	const layer = parent.layer.name;
	const minLength = parent.instVars.initialLength;
	const x1 = parent.x + (parent.width - 2 * EXPRESSION_WIDTH - AVAILABLE_EXPRESSION_MARGIN)/2;
	const x2 = x1 + EXPRESSION_WIDTH + AVAILABLE_EXPRESSION_MARGIN;

	let x = x1;
	let y = parent.y + 3 * AVAILABLE_EXPRESSION_MARGIN + EXPRESSION_HEIGHT/2;

	for (const expression of definitions) {
		createCodeBlockButton(
			codeBlockButtonObject,
			layer,
			x,
			y,
			expression,
			parent,
		);

		if (x === x1) {
			x = x2;
		} else {
			x = x1;
			y += EXPRESSION_HEIGHT + AVAILABLE_EXPRESSION_MARGIN;
		}
	}

	if (x === x2) {
		y += EXPRESSION_HEIGHT + AVAILABLE_EXPRESSION_MARGIN;
	}

	parent.height = Math.max(minLength, y - parent.y - AVAILABLE_EXPRESSION_MARGIN/2);
	parent.instVars.min = parent.y - (parent.height - minLength);
}
