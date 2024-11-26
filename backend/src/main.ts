import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { AllExceptionsFilter } from './app/core/common/filters/all-exceptions.filter'
import { Logger } from '@nestjs/common'
import 'dotenv/config'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())
	app.enableCors({
		origin: process.env.CLIENT_HOST ?? 'http://localhost:5173',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true
	})
	app.setGlobalPrefix('api')
	app.useGlobalFilters(new AllExceptionsFilter())

	await app.listen(process.env.PORT ?? 3000)
	Logger.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
