import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Gate } from './gate.entity';

@EntityRepository(Gate)
export class GateRepository extends BaseRepository<Gate> {

	public entity = Gate;
}