import { IPFormatter } from '..';

describe('IP helper tests', () => {

	it('should return original value', () => {

		expect(IPFormatter('Rouge')).toEqual('Rouge');
	});

	it('should return a substr value', () => {

		expect(IPFormatter('::ffff:Anaconda')).toEqual('Anaconda');
	});
});