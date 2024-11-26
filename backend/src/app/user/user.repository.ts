import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserCollection, UserDocument } from './user.schema'
import { Model } from 'mongoose'
import { CreateUserDTO, UpdateUserDTO } from './user.dto'

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(UserCollection) private readonly userModel: Model<UserDocument>
	) {}

	async create(data: CreateUserDTO): Promise<User> {
		const createdUser = new this.userModel(data)
		return createdUser.save()
	}

	async update(id: string, data: UpdateUserDTO): Promise<User> {
		return this.userModel.findByIdAndUpdate(id, data, { new: true }).lean().exec()
	}

	async findById(id: string): Promise<User> {
		return this.userModel.findById(id).lean().exec()
	}

	async findByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ email }).lean().exec()
	}
}
