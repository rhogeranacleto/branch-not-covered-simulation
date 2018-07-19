import { BaseRepository } from '../../../src/core/repositories/base.repository';
import { SimpleEntityTest } from '../entities/simple';

export class Repositorio extends BaseRepository<SimpleEntityTest> {

	public entity = SimpleEntityTest;
}