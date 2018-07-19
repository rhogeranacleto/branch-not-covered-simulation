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

	describe('FindOne', () => {

		it('should base repository call findOne on call findById without options', async () => {

			const jj = new SimpleEntityTest();

			manager.findOne.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.findById(1)).resolves.toEqual(jj);
			expect(manager.findOne).toBeCalledWith(SimpleEntityTest, 1, undefined);
		});

		it('should base repository call findOne on call findById with options', async () => {

			const jj = new SimpleEntityTest();

			manager.findOne.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.findById(1, {
				relations: ['selfie']
			})).resolves.toEqual(jj);
			expect(manager.findOne).toBeCalledWith(SimpleEntityTest, 1, {
				relations: ['selfie']
			});
		});

		it('should base repository call findOne on call findOne without options', async () => {

			const jj = new SimpleEntityTest();

			manager.findOne.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.findOne()).resolves.toEqual(jj);
			expect(manager.findOne).toBeCalledWith(SimpleEntityTest, undefined);
		});

		it('should base repository call findOne on call findOne with options', async () => {

			const jj = new SimpleEntityTest();

			manager.findOne.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.findOne({
				relations: ['selfie']
			})).resolves.toEqual(jj);
			expect(manager.findOne).toBeCalledWith(SimpleEntityTest, {
				relations: ['selfie']
			});
		});
	});

	describe('find tests', () => {

		it('should base repository call find on call find without options and pagination', async () => {

			const jj = [new SimpleEntityTest()];

			manager.find.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.find()).resolves.toEqual(jj);
			expect(manager.find).toBeCalledWith(SimpleEntityTest, undefined);
		});

		it('should base repository call find on call find with options and without pagination', async () => {

			const jj = [new SimpleEntityTest()];

			manager.find.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.find({
				relations: ['selfie']
			})).resolves.toEqual(jj);
			expect(manager.find).toBeCalledWith(SimpleEntityTest, {
				relations: ['selfie']
			});
		});

		it('should base repository call find on call find without options and with pagination', async () => {

			const jj = [new SimpleEntityTest()];

			manager.find.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.find(undefined, {
				page: 0,
				perPage: 20
			})).resolves.toEqual(jj);
			expect(manager.find).toBeCalledWith(SimpleEntityTest, undefined);
		});

		it('should base repository call find on call find with options and pagination', async () => {

			const jj = [new SimpleEntityTest()];

			manager.find.mockImplementation(() => Promise.resolve(jj));

			await expect(repo.find({
				relations: ['selfie']
			}, {
					page: 3,
					perPage: 10
				})).resolves.toEqual(jj);
			expect(manager.find).toBeCalledWith(SimpleEntityTest, {
				relations: ['selfie'],
				skip: 20,
				take: 10
			});

			await expect(repo.find({}, {
				page: 1,
				perPage: 20
			})).resolves.toEqual(jj);
			expect(manager.find).toHaveBeenLastCalledWith(SimpleEntityTest, {
				skip: 0,
				take: 20
			});
		});
	});

	describe('findAndCount tests', () => {

		it('should base repository call findAndCount on call findAndCount without options and pagination', async () => {

			const jj = [[new SimpleEntityTest()], 1];

			manager.findAndCount.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.findAndCount()).resolves.toEqual(jj);
			expect(manager.findAndCount).toBeCalledWith(SimpleEntityTest, undefined);
		});

		it('should base repository call findAndCount on call findAndCount with options and without pagination', async () => {

			const jj = [[new SimpleEntityTest()], 1];

			manager.findAndCount.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.findAndCount({
				relations: ['selfie']
			})).resolves.toEqual(jj);
			expect(manager.findAndCount).toBeCalledWith(SimpleEntityTest, {
				relations: ['selfie']
			});
		});

		it('should base repository call findAndCount on call findAndCount without options and with pagination', async () => {

			const jj = [[new SimpleEntityTest()], 1];

			manager.findAndCount.mockImplementationOnce(() => Promise.resolve(jj));

			await expect(repo.findAndCount(undefined, {
				page: 0,
				perPage: 20
			})).resolves.toEqual(jj);
			expect(manager.findAndCount).toBeCalledWith(SimpleEntityTest, undefined);
		});

		it('should base repository call findAndCount on call findAndCount with options and pagination', async () => {

			const jj = [[new SimpleEntityTest()], 1];

			manager.findAndCount.mockImplementation(() => Promise.resolve(jj));

			await expect(repo.findAndCount({
				relations: ['selfie']
			}, {
					page: 3,
					perPage: 10
				})).resolves.toEqual(jj);
			expect(manager.findAndCount).toBeCalledWith(SimpleEntityTest, {
				relations: ['selfie'],
				skip: 20,
				take: 10
			});

			await expect(repo.findAndCount({}, {
				page: 1,
				perPage: 20
			})).resolves.toEqual(jj);
			expect(manager.findAndCount).toHaveBeenLastCalledWith(SimpleEntityTest, {
				skip: 0,
				take: 20
			});
		});
	});
});