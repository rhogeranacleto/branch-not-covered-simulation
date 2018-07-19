import { NotFoundException } from '@nestjs/common';
import {
	EntityManager,
	FindConditions,
	FindManyOptions,
	FindOneOptions,
	ObjectLiteral,
	SaveOptions
} from 'typeorm';
import { IPagination, paginate } from './pagination';

export abstract class BaseRepository<E extends ObjectLiteral> {

	public abstract entity: new () => E;

	constructor(private readonly manager: EntityManager) { }

	public save(entity: E, options?: SaveOptions) {

		return this.manager.save(entity, options);
	}

	public async updateOne(id: number, partialEntity: Partial<E>) {

		const count = await this.manager.count(this.entity, {
			where: {
				id
			}
		});

		if (count > 0) {

			partialEntity.id = id;

			return this.manager.save(partialEntity);
		}

		throw new NotFoundException();
	}

	public findById(id: number, options?: FindOneOptions<E>) {

		// valida centro de custo e filial

		return this.manager.findOne(this.entity, id, options);
	}

	public findOne(options?: FindOneOptions<E>) {

		// valida centro de custo e filial

		return this.manager.findOne(this.entity, options);
	}

	public find(options?: FindManyOptions<E>, pagination?: IPagination) {

		// valida centro de custo e filial

		const newOptions = options && pagination ? paginate<E>(options, pagination) : options;

		return this.manager.find(this.entity, newOptions);
	}

	public findAndCount(options?: FindManyOptions<E>, pagination?: IPagination) {

		// valida centro de custo e filial

		const newOptions = options && pagination ? paginate<E>(options, pagination) : options;

		return this.manager.findAndCount(this.entity, newOptions);
	}

	public async removeOne(id: number) {

		const record = await this.manager.findOne(this.entity, id);

		if (record) {

			return this.manager.remove(record);
		}

		throw new NotFoundException();
	}

	public async remove(options: FindConditions<E>) {

		const records = await this.manager.find(this.entity, options);

		return this.manager.remove(records);
	}
}