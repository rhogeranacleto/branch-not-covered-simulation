import * as Joi from 'joi';
import { FitBodyPipe } from '../';
import { PersonEntityTest } from '../../../../tests/helpers/entities/person';

describe('FitBody pipe tests', () => {

	beforeEach(() => {

		jest.clearAllMocks();
	});

	describe('Without validation', () => {

		const fitBody = new FitBodyPipe(PersonEntityTest);

		it('should cast body to PersonEntityTest entity', () => {

			expect(fitBody.transform({
				name: 'Maria'
			})).toBeInstanceOf(PersonEntityTest);

			expect(() => fitBody.transform({
				name: 'Maria'
			})).not.toThrowError();
		});

		it('should cast put body props on casted object props', () => {

			const body = {
				name: 'Carai',
				age: 4,
				isRafa: true
			};
			const casted = fitBody.transform(body);

			expect(casted.name).toEqual('Carai');
			expect(casted.age).toEqual(4);
			expect(casted.isRafa).toEqual(true);
			expect(casted.deathDate).toBeUndefined();
		});
	});

	describe('With validation', () => {

		const fitBody = new FitBodyPipe(PersonEntityTest, {
			name: Joi.string().required(),
			age: Joi.number().min(18).required(),
			isRafa: Joi.bool().required(),
			deathDate: Joi.date()
		});

		it('should get error when cast wrong body to PersonEntityTest entity', () => {

			expect(() => fitBody.transform({
				name: 'Maria',
				age: 4
			})).toThrowError();
		});

		it('should cast body to PersonEntityTest entity', () => {

			// Validar com strings pois o paylod virá em string e o joi deve converter para o formato informado
			const body = {
				name: 'Eita',
				age: '22',
				isRafa: 'true',
				deathDate: '2018-07-17T21:54:02.359Z'
			};

			// tslint:disable-next-line:no-any
			expect(() => fitBody.transform(body as any)).not.toThrowError();

			// tslint:disable-next-line:no-any
			const casted = fitBody.transform(body as any);

			expect(casted.name).toEqual('Eita');
			expect(casted.age).toEqual(22);
			expect(casted.isRafa).toEqual(true);
			expect(casted.deathDate).toEqual(expect.any(Date));
		});
	});
});