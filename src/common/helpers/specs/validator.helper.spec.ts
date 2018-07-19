import { UnprocessableEntityException } from '@nestjs/common';
import * as Joi from 'joi';
import { joiValidator } from '../';

describe('Validator helper test', () => {

	const executable = () => joiValidator({
		name: 'maria',
		age: '1',
		horses: 4,
		birth: '2018-07-17T21:54:02.359Z'
	}, {
			name: Joi.string(),
			age: Joi.number(),
			horses: Joi.number().min(2),
			birth: Joi.date()
		});

	it('should validate data', () => {

		expect(executable).not.toThrowError();
	});

	it('should convert data', () => {

		expect(executable()).toEqual({
			name: 'maria',
			age: 1,
			horses: 4,
			birth: expect.any(Date)
		});
	});

	it('should throw error with one wrong data', () => {

		expect(() => joiValidator({
			name: 3
		}, {
				name: Joi.string()
			})).toThrowError(UnprocessableEntityException);
	});

	it('should throw error with two wrong data', () => {

		expect(() => joiValidator({
			name: 3,
			grande: 'um texto bem grande não é permitido'
		}, {
				name: Joi.string(),
				grande: Joi.string().max(10)
			})).toThrowError(UnprocessableEntityException);
	});
});