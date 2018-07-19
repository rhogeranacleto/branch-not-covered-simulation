export function cast<T>(Entity: new () => T, body: Partial<T>) {

	const entity = new Entity();

	for (const key of Object.keys(body)) {

		const value = body[key];

		if (typeof value !== 'undefined') {

			entity[key] = value;
		}
	}

	return entity;
}