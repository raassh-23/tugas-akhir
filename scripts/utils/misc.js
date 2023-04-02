import { ContainerCommand } from '../Commands/index.js';

/**
 * 
 * @param {Number} ms 
 * @returns {Promise} Promise that resolves after ms milliseconds
 */
export function waitForMillisecond(ms) { 
	console.log("waiting");
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
 * @returns {?ContainerCommand}
 */
export function getContainerParent(sprite) {
	let parent = sprite.getParent();

	while (!(parent instanceof ContainerCommand)) {
		parent = parent.getParent();
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