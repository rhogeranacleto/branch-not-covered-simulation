import { UnprocessableEntityException } from '@nestjs/common';
import * as Joi from 'joi';

export function joiValidator<T>(body: Partial<T>, schema: object) {

	const { error, value } = Joi.validate(body, schema);

	if (error) {

		throw new UnprocessableEntityException('Error');
	}

	return value;
}