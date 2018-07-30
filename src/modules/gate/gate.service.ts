import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { IPagination } from '../../core/repositories/pagination';
import { GateRepository } from './gate.repository';

@Injectable()
export class GateService {

	public getAll(pagination: IPagination) {

		return getCustomRepository(GateRepository).findAndCount(undefined, pagination);
	}
}