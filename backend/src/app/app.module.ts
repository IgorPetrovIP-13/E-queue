import { Module } from '@nestjs/common'
import { ConfigModule } from './core/config/config.module'
import { MongooseModule } from './core/mongoose/mogoose.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './core/auth/auth.module'
import { ProfileModule } from './core/profile/profile.module'

@Module({
	imports: [
		ConfigModule,
		MongooseModule,
		AuthModule,
		ProfileModule,
		UserModule
	]
})
export class AppModule {}
