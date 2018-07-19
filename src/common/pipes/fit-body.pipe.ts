import { Injectable, PipeTransform } from '@nestjs/common';
import { cast, joiValidator } from '../helpers';

@Injectable()
export class FitBodyPipe<T> implements PipeTransform {

	constructor(
		private readonly entity: new () => T,
		private readonly schema?: object
	) { }

	public transform(body: Partial<T>) {

		let data = body;

		if (this.schema) {

			data = joiValidator(body, this.schema);
		}

		return cast(this.entity, data);
	}
}