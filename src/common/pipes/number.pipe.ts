import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NumberPipe implements PipeTransform {

	constructor() { }

	public transform(param: string) {

		return Number(param);
	}
}