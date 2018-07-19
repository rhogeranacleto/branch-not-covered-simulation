import { Module } from '@nestjs/common';
import { GateModule } from './modules/gate/gate.module';

@Module({
	imports: [
		GateModule
	]
})
export class ApplicationModule { }