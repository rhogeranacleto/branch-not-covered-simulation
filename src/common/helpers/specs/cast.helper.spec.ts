import { cast } from '../';
import { PersonEntityTest } from '../../../../tests/helpers/entities/person';

describe('Cast helper test', () => {

	it('should work correctly with full data', () => {

		const data = {
			name: 'Lucas',
			age: 12,
			isRafa: false,
			deathDate: new Date()
		};
		const casted = cast(PersonEntityTest, data);

		expect(casted).toBeInstanceOf(PersonEntityTest);
		expect(casted.age).toEqual(12);
		expect(casted.name).toEqual('Lucas');
		expect(casted.isRafa).toEqual(false);
		expect(casted.deathDate).toEqual(data.deathDate);
	});

	it('should work correctly with partial data', () => {

		const data = {
			isRafa: true,
			deathDate: undefined
		};
		const casted = cast(PersonEntityTest, data);

		expect(casted).toBeInstanceOf(PersonEntityTest);
		expect(casted.isRafa).toEqual(true);
		expect(casted.age).toBeUndefined();
		expect(casted.name).toBeUndefined();
		expect(casted.deathDate).toBeUndefined();
	});
});