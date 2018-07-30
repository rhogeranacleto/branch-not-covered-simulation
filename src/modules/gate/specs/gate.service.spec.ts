import * as typeorm from 'typeorm';
import { GateRepository } from '../gate.repository';
import { GateService } from '../gate.service';

// tslint:disable:no-any

describe('Gate service tests', () => {

	const repository = {
		findAndCount: jest.fn(() => Promise.resolve('findAndCount'))
	};
	const getCustomRepository = jest.fn(() => repository);

	jest.spyOn(typeorm, 'getCustomRepository').mockImplementation(getCustomRepository);

	const gateService = new GateService();

	beforeEach(() => {

		jest.clearAllMocks();
	});

	it('getAll', async () => {

		await expect(gateService.getAll({
			page: 1,
			perPage: 3
		})).resolves.toEqual('findAndCount');

		expect(getCustomRepository).toBeCalledWith(GateRepository);
	});
});