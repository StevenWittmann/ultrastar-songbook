export const greeting = () => {
	console.log('Hello mom');
};

export const createFirstLetterList = (_songList: []) => {
	const uniqueFirstLetterObjects = [];
	const encounteredFirstLetters = new Set();
	_songList.forEach((item, index) => {
		const firstLetter = (Object.values(item)[1] as string).charAt(0);

		if (!encounteredFirstLetters.has(firstLetter)) {
			const rangeFrom = index;
			let rangeTo =
				uniqueFirstLetterObjects.length > 0
					? (uniqueFirstLetterObjects[uniqueFirstLetterObjects.length - 1].rangeTo = rangeFrom)
					: 1;

			const obj = { id: uniqueFirstLetterObjects.length, firstLetter, rangeFrom, rangeTo };
			uniqueFirstLetterObjects.push(obj);
			encounteredFirstLetters.add(firstLetter);
		}
	});
	return uniqueFirstLetterObjects;
};

/**
 * adds a object if not exists in array
 * removes object if exists in array
 * @param array current array of objects
 * @param newObject new object
 * @returns array of objects
 */
export function toggleObject(array: [], newObject: {}) {
	const uniqueArray = [];
	let deleted = false;
	array.forEach((currObject) => {
		if (JSON.stringify(newObject) === JSON.stringify(currObject)) {
			deleted = true;
		} else {
			uniqueArray.push(currObject);
		}
	});
	if (!deleted) uniqueArray.push(newObject);
	return uniqueArray;
}
