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
