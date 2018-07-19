export interface IPagination {
	page: number;
	perPage: number;
	sortField?: string;
	sortOrder?: 'ASC' | 'DESC' | 1 | -1;
}