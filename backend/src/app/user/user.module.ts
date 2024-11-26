import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserCollection, UserSchema } from './user.schema'
import { UserRepository } from './user.repository'

@Module({
	imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
	providers: [UserService, UserRepository],
	exports: [UserService],
	controllers: [UserController]
})
export class UserModule {}
