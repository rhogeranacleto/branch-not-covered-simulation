import { PaginationPipe } from '..';

describe('Pagination pipe tests', () => {

	it('should return a transformed pagination', () => {

		expect(new PaginationPipe().transform({
			page: '1',
			perPage: '23'
		})).toEqual({
			page: 1,
			perPage: 23
		});
	});
});