import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ZodValidationPipe } from 'src/app/core/common/pipes/validation.pipe'
import {
	CreateUserDTO,
	createUserValidationSchema,
	UpdateUserDTO,
	updateUserValidationSchema
} from './user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(
		@Body(new ZodValidationPipe(createUserValidationSchema)) body: CreateUserDTO
	) {
		return this.userService.create(body)
	}

	@Put(':id')
	update(
		@Param('id') id: string,
		@Body(new ZodValidationPipe(updateUserValidationSchema)) body: UpdateUserDTO
	) {
		return this.userService.update(id, body)
	}

	@Get(':id')
	findById(@Param('id') id: string) {
		return this.userService.findById(id)
	}
}
