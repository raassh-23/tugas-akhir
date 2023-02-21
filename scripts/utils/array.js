/**
 * 
 * 
 * @callback CompareFunction
 * @param {*} a
 * @param {*} b
 * @returns {number} -1 if a < b, 0 if a == b, 1 if a > b
 */

/**
 * 
 * @param {*} item 
 * @param {Array} arr 
 * @param {CompareFunction} comparer 
 * @returns index of the first element in array that is greater than or equal to item
 */
function findLocationToInsert(item, arr, comparer) {
	let low = 0;
	let high = arr.length;

	while(low < high) {
		const mid = (low + high) >>> 1;
		if(comparer(arr[mid], item) < 0) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
}

/**
 * 
 * @param {*} item 
 * @param {Array} arr 
 * @param {CompareFunction} comparer 
 */
export function insertToSortedArray(item, arr, comparer) {
	arr.splice(findLocationToInsert(item, arr, comparer), 0, item);
}

/**
 * 
 * @param {*} item 
 * @param {Array} arr
 * @returns {boolean} true if item was found and removed, false otherwise
 */
export function removeFromArray(item, arr) {
	const index = arr.indexOf(item);

	if (index > -1) {
		arr.splice(index, 1);
		return true;
	} else {
		return false;
	}
}

/**
 * 
 * @param {Array.<*>} arr 
 */
export function emptyArray(arr) {
	arr.length = 0;
}
