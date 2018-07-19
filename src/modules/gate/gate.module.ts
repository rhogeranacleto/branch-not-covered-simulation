import { Module } from '@nestjs/common';
import { GateController } from './gate.controller';

@Module({
	controllers: [GateController]
})
export class GateModule { }