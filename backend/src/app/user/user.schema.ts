import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { RoleEnum } from '../core/common/enums/role-enum'

export const UserCollection = 'users'

export type UserDocument = HydratedDocument<User>

@Schema({ versionKey: false })
export class User {
	_id: string

	@Prop()
	name: string

	@Prop()
	surname: string

	@Prop()
	email: string

	@Prop()
	password: string

	@Prop({ default: RoleEnum.USER })
	role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
