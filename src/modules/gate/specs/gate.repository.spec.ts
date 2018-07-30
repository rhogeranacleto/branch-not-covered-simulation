import { BaseRepository } from '../../../core/repositories/base.repository';
import { GateRepository } from '../gate.repository';

describe('Gate repository', () => {

	it('should be instance of repository', () => {

		// tslint:disable-next-line:no-any
		expect(new GateRepository({} as any)).toBeInstanceOf(BaseRepository);
	});
});