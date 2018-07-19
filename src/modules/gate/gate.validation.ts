import * as Joi from 'joi';

export const GATE_VALIDATION = {
	id: Joi.number(),
	name: Joi.string().required().label('gate.name'),
	data: Joi.date()
};