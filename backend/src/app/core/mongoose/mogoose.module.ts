import { Module } from '@nestjs/common'
import { MongooseModule as MongoDB } from '@nestjs/mongoose'
import { ConfigService } from '../config/config.service'

@Module({
	imports: [
		MongoDB.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				uri: configService.dbHost
			}),
			inject: [ConfigService]
		})
	]
})
export class MongooseModule {}
