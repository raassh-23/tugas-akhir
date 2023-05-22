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
 * @typedef {import('../level-data.js').CodeBlockDefinition} CodeBlockDefinition
 */

/**
 * 
 * @param {IObjectClass<ICodeBlockButton>} codeBlockButtonObject 
 * @param {string} layer 
 * @param {number} x 
 * @param {number} y 
 * @param {CodeBlockDefinition} definition 
 * @param {IWorldInstance} parent 
 * @param {{ inactiveLayer: string, panelId: string }} blockInstVars
 */
export function createCodeBlockButton(
	codeBlockButtonObject, layer,
	x, y, definition, parent,
	{ inactiveLayer, panelId },
) {
	const button = codeBlockButtonObject.createInstance(layer, x, y);

	button.setAnimation(definition.name);
	button.animationFrame = definition.frame;

	button.instVars.panelId = panelId;
	button.instVars.inactiveLayer = inactiveLayer;

	parent.addChild(button, {
		transformX: true,
		transformY: true,
	})
}

const AVAILABLE_COMMANDS_MARGIN = 16;
const COMMAND_WIDTH = 96;
const COMMAND_HEIGHT = 96;

/**
 * 
 * @param {IObjectClass<ICodeBlockButton>} codeBlockButtonObject
 * @param {IWorldInstance} parent 
 * @param {CodeBlockDefinition[]} definitions 
 * @param {{ inactiveLayer: string, panelId: string }} blockInstVars
 */
export function setupCommands(codeBlockButtonObject, parent, definitions, blockInstVars) {
	const layer = parent.layer.name;
	const minLength = parent.instVars.initialLength;
	const x = parent.x + (parent.width - COMMAND_WIDTH) / 2;
	let y = parent.y + 3 * AVAILABLE_COMMANDS_MARGIN + COMMAND_HEIGHT / 2;

	for (const command of definitions) {
		createCodeBlockButton(
			codeBlockButtonObject,
			layer,
			x,
			y,
			command,
			parent,
			blockInstVars,
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
 * @param {CodeBlockDefinition[]} definitions 
 * @param {{ inactiveLayer: string, panelId: string }} blockInstVars
 */
export function setupExpressions(codeBlockButtonObject, parent, definitions, blockInstVars) {
	const layer = parent.layer.name;
	const minLength = parent.instVars.initialLength;
	const x1 = parent.x + (parent.width - 2 * EXPRESSION_WIDTH - AVAILABLE_EXPRESSION_MARGIN) / 2;
	const x2 = x1 + EXPRESSION_WIDTH + AVAILABLE_EXPRESSION_MARGIN;

	let x = x1;
	let y = parent.y + 3 * AVAILABLE_EXPRESSION_MARGIN + EXPRESSION_HEIGHT / 2;

	for (const expression of definitions) {
		createCodeBlockButton(
			codeBlockButtonObject,
			layer,
			x,
			y,
			expression,
			parent,
			blockInstVars,
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

	parent.height = Math.max(minLength, y - parent.y - AVAILABLE_EXPRESSION_MARGIN / 2);
	parent.instVars.min = parent.y - (parent.height - minLength);
}

const positionMap = [
	{ dx: 0, dy: 0, targetProperty: 'center' },
	{ dx: 0, dy: -1, targetProperty: 'up' },
	{ dx: 0, dy: 1, targetProperty: 'down' },
	{ dx: -1, dy: 0, targetProperty: 'left' },
	{ dx: 1, dy: 0, targetProperty: 'right' },
	{ dx: -1, dy: -1, targetProperty: 'upperleft' },
	{ dx: 1, dy: -1, targetProperty: 'upperright' },
	{ dx: -1, dy: 1, targetProperty: 'lowerleft' },
	{ dx: 1, dy: 1, targetProperty: 'lowerright' },
];

/**
 * 
 * @param {IPlayer} player 
 * @param {import('../for-events.js').GameState} state
 */
export function setPlayerSurrounding(player, state) {
	const runtime = player.runtime;
	const [gridX, gridY] = player.behaviors.TileMovement.getGridPosition();

	state.surrounding = {
		up: 0,
		down: 0,
		left: 0,
		right: 0,
		upperleft: 0,
		upperright: 0,
		lowerleft: 0,
		lowerright: 0,
		center: 0,
	}

	runtime.objects.LevelText.getAllInstances().forEach((text) => {
		const textGridX = text.instVars.gridX;
		const textGridY = text.instVars.gridY;
		const value = Number(text.text);

		for (const { dx, dy, targetProperty } of positionMap) {
			if (gridX + dx === textGridX && gridY + dy === textGridY) {
				state.surrounding[targetProperty] = value;
				break;
			}
		}
	});
}
