import { NumberPipe } from '../';

describe('Number pipe tests', () => {

	it.each([
		[2, '2'],
		[3.3, '3.3'],
		[0.5, '00000.5'],
		[1000.5, '1000.50000'],
		[NaN, 'maria']
	])('should return %s with string param "%s"', (result, param) => {

		expect(new NumberPipe().transform(param)).toEqual(result);
	});
});