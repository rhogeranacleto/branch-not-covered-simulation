import { NotFoundException } from '@nestjs/common';
import { SimpleEntityTest } from '../../../../tests/helpers/entities/simple';
import { Repositorio } from '../../../../tests/helpers/repositories/repositorio';

describe('Base repository tests', () => {

	const manager = {
		save: jest.fn(),
		findOne: jest.fn(),
		find: jest.fn(),
		findAndCount: jest.fn(),
		remove: jest.fn(),
		count: jest.fn()
	};
	// tslint:disable-next-line:no-any
	const repo = new Repositorio(manager as any);

	beforeEach(() => {

		jest.clearAllMocks();
	});

	describe('Save', () => {

		it('should base repository call save without options', async () => {

			const jj = new SimpleEntityTest();

			await repo.save(jj);

			expect(manager.save).toBeCalledWith(jj, undefined);
		});
	});

	describe('UpdateOne', () => {

		it('should base repository call updateOne correctly', async () => {

			manager.count.mockReturnValueOnce(Promise.resolve(1));

			await repo.updateOne(33, {
				name: 'carai'
			});

			expect(manager.count).toBeCalledWith(SimpleEntityTest, {
				where: {
					id: 33
				}
			});
			expect(manager.save).toBeCalledWith({
				id: 33,
				name: 'carai'
			});
		});

		it('should base repository call updateOne and throw an error', async () => {

			manager.count.mockReturnValueOnce(Promise.resolve(0));

			await expect(repo.updateOne(33, {
				name: 'carai'
			})).rejects.toThrowError(NotFoundException);

			expect(manager.count).toBeCalledWith(SimpleEntityTest, {
				where: {
					id: 33
				}
			});
			expect(manager.save).not.toBeCalledWith({
				id: 33,
				name: 'carai'
			});
		});
	});

	describe('Delete', () => {

		it('should base repository call delete on call deleteById', async () => {

			const entity = new SimpleEntityTest();

			manager.findOne.mockReturnValueOnce(Promise.resolve(entity));

			await repo.removeOne(7);
			expect(manager.findOne).toBeCalledWith(SimpleEntityTest, 7);
			expect(manager.remove).toBeCalledWith(entity);
		});

		it('should base repository not call delete on call deleteById and throw an error', async () => {

			const entity = new SimpleEntityTest();

			manager.findOne.mockReturnValueOnce(Promise.resolve(undefined));

			await expect(repo.removeOne(66)).rejects.toThrowError(NotFoundException);

			expect(manager.findOne).toBeCalledWith(SimpleEntityTest, 66);
			expect(manager.remove).not.toBeCalledWith(entity);
		});

		it('should base repository call delete on call delete', async () => {

			const entities = [new SimpleEntityTest(), new SimpleEntityTest()];

			manager.find.mockReturnValueOnce(Promise.resolve(entities));

			await repo.remove({
				id: 66
			});

			expect(manager.find).toBeCalledWith(SimpleEntityTest, {
				id: 66
			});
			expect(manager.remove).toBeCalledWith(entities);
		});
	});
});