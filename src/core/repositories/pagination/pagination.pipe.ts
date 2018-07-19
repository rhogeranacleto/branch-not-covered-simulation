import { Injectable, PipeTransform } from '@nestjs/common';
import { IPagination } from './pagination.interface';

@Injectable()
export class PaginationPipe implements PipeTransform<IPagination> {

	public transform(pagination: { page: string | number, perPage: string | number }) {

		pagination.page = Number(pagination.page);
		pagination.perPage = Number(pagination.perPage);

		return pagination;
	}
}