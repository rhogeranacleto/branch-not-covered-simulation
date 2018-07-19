// tslint:disable-next-line:no-any
export function blurData(data: any, sensitiveKeys: string[]) {

	if (Array.isArray(data)) {

		for (const value of data) {

			blurData(value, sensitiveKeys);
		}
	} else {

		blurObject(data, sensitiveKeys);
	}

	return data;
}

// tslint:disable-next-line:no-any
export function blurObject(data: any, sensitiveKeys: string[]) {

	for (const key of Object.keys(data)) {

		if (Array.isArray(data[key])) {

			blurData(data[key], sensitiveKeys);
		} else if (sensitiveKeys.indexOf(key.toLowerCase()) >= 0) {

			data[key] = '**obfuscated**';
		}
	}

	return data;
}