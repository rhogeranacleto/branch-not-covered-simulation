export function IPFormatter(value: string) {

	if (value.substr(0, 7) === '::ffff:') {

		return value.substr(7);
	}

	return value;
}