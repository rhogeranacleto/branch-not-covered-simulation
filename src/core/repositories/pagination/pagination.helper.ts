import { FindManyOptions } from 'typeorm';
import { IPagination } from './pagination.interface';

export function paginate<E>(options: FindManyOptions<E>, pagination: IPagination = {
	page: 1,
	perPage: 20
}): FindManyOptions<E> {

	const { page, perPage, sortField, sortOrder } = pagination;

	const paginateOptions = {
		...options,
		skip: page === 1 ? 0 : (page - 1) * perPage,
		take: perPage
	};

	if (sortField && sortOrder) {

		paginateOptions.order = options.order || {};
		paginateOptions.order[sortField as keyof E] = sortOrder;
	}

	return paginateOptions;
}