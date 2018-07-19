import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';
import { FitBodyPipe, NumberPipe } from '../../common/pipes';
import { IPagination, PaginationPipe } from '../../core/repositories/pagination';
import { Gate } from './gate.entity';
import { GateRepository } from './gate.repository';
import { GATE_VALIDATION } from './gate.validation';

@Controller('gates')
export class GateController {

	@Get()
	public getAll(@Query(PaginationPipe) pagination: IPagination) {

		return getCustomRepository(GateRepository).findAndCount(undefined, pagination);
	}

	@Get(':id')
	public getOne(@Param('id') id: number) {

		return getCustomRepository(GateRepository).findById(id);
	}

	@Delete(':id')
	public removeOne(@Param('id') id: number) {

		return getCustomRepository(GateRepository).removeOne(id);
	}

	@Post()
	public create(@Body(new FitBodyPipe(Gate, GATE_VALIDATION)) gate: Gate) {

		return getCustomRepository(GateRepository).save(gate);
	}

	@Put(':id')
	public edit(@Param('id', NumberPipe) id: number, @Body(new FitBodyPipe(Gate)) gate: Gate) {

		return getCustomRepository(GateRepository).updateOne(id, gate);
	}
}