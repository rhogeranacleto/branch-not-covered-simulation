import { paginate } from '..';

describe('Pagination helper tests', () => {

	it('should return a correct options with not paginate', () => {

		expect(paginate({
			select: ['1']
		})).toEqual({
			select: ['1'],
			skip: 0,
			take: 20
		});
	});

	it('should return a correct options with pagination', () => {

		expect(paginate({
			select: ['1']
		}, {
				page: 1,
				perPage: 20
			})).toEqual({
				select: ['1'],
				skip: 0,
				take: 20
			});

		expect(paginate({
			select: ['1']
		}, {
				page: 5,
				perPage: 20
			})).toEqual({
				select: ['1'],
				skip: 80,
				take: 20
			});

		expect(paginate({
			select: ['1']
		}, {
				page: 10,
				perPage: 10
			})).toEqual({
				select: ['1'],
				skip: 90,
				take: 10
			});
	});

	it('should return correct options with sort pagination', () => {

		expect(paginate({}, {
			page: 1,
			perPage: 20,
			sortField: 'oi',
			sortOrder: -1
		})).toEqual({
			skip: 0,
			take: 20,
			order: {
				oi: -1
			}
		});

		expect(paginate({
			order: {
				otro: 'ASC'
			}
		}, {
				page: 1,
				perPage: 20,
				sortField: 'oi',
				sortOrder: -1
			})).toEqual({
				skip: 0,
				take: 20,
				order: {
					otro: 'ASC',
					oi: -1
				}
			});
	});
});