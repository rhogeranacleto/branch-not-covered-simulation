import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { ApplicationModule } from './src/app.module';

async function bootstrap() {

	const app = await NestFactory.create(ApplicationModule);

	await app.listen(process.env.PORT || 3000);
}

bootstrap().catch(err => {

	console.error(err);
});