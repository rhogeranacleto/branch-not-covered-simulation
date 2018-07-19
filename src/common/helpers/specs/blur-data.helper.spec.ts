import { blurData } from '../blur-data.helper';

describe('BlurData tests', () => {

	const sensitiveKeys = ['password'];

	it('should blur values inside an array', () => {

		const data = [{
			id: 1,
			password: 1234
		}];

		expect(blurData(data, sensitiveKeys)).toEqual([{
			id: 1,
			password: '**obfuscated**'
		}]);
	});

	it('should blur values inside a object', () => {

		const data = {
			id: 2,
			password: 15610
		};

		expect(blurData(data, sensitiveKeys)).toEqual({
			id: 2,
			password: '**obfuscated**'
		});
	});

	it('should blur values inside an array of objects', () => {

		const data = {
			id: 2,
			password: 15130,
			items: [{
				value: 10,
				password: 12156
			}]
		};

		expect(blurData(data, sensitiveKeys)).toEqual({
			id: 2,
			password: '**obfuscated**',
			items: [{
				value: 10,
				password: '**obfuscated**'
			}]
		});
	});
});