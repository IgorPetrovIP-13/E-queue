import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { CreateUserDTO, UpdateUserDTO } from './user.dto'
import { User } from './user.schema'

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async create(data: CreateUserDTO): Promise<User> {
		try {
			return await this.userRepository.create(data)
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	async update(id: string, data: UpdateUserDTO): Promise<User> {
		try {
			return await this.userRepository.update(id, data)
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	async findById(id: string): Promise<User> {
		try {
			return await this.userRepository.findById(id)
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	async findByEmail(email: string): Promise<User> {
		try {
			return await this.userRepository.findByEmail(email)
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}
}
