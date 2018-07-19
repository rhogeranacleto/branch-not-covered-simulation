import * as typeorm from 'typeorm';
import { GateController } from '../gate.controller';
import { GateRepository } from '../gate.repository';

// tslint:disable:no-any

describe('Gate controller tests', () => {

	const repository = {
		findAndCount: jest.fn(() => Promise.resolve('findAndCount')),
		findById: jest.fn(() => Promise.resolve('findById')),
		removeOne: jest.fn(() => Promise.resolve('removeOne')),
		save: jest.fn(() => Promise.resolve('save')),
		updateOne: jest.fn(() => Promise.resolve('updateOne'))
	};
	const getCustomRepository = jest.fn(() => repository);

	jest.spyOn(typeorm, 'getCustomRepository').mockImplementation(getCustomRepository);

	const gateController = new GateController();

	beforeEach(() => {

		jest.clearAllMocks();
	});

	it.each([
		[
			'getAll',
			'findAndCount',
			[{
				page: 5,
				perPage: 34
			}],
			[undefined, {
				page: 5,
				perPage: 34
			}]
		],
		[
			'getOne',
			'findById',
			[666],
			[666]
		],
		[
			'removeOne',
			'removeOne',
			[777],
			[777]
		],
		[
			'create',
			'save',
			[{
				obigeto: true
			}],
			[{
				obigeto: true
			}]
		],
		[
			'edit',
			'updateOne',
			[
				22,
				{
					maria: 'Pedro'
				}
			],
			[
				22,
				{
					maria: 'Pedro'
				}
			]
		]
	])('should %s call %s correctly', async (
		controllerMethod,
		repositoryMethod,
		controllerArguments,
		repositoryArguments
	) => {

		await expect(gateController[controllerMethod](...controllerArguments)).resolves.toEqual(repositoryMethod);

		expect(getCustomRepository).toBeCalledWith(GateRepository);
		expect(repository[repositoryMethod]).toBeCalledWith(...repositoryArguments);
	});
});