import { z } from 'zod'

export const createUserValidationSchema = z
	.object({
		name: z.string().min(1),
		surname: z.string().min(1),
		email: z.string().email(),
		password: z.string().min(6)
	})
	.strict()

export type CreateUserDTO = z.infer<typeof createUserValidationSchema>

export const updateUserValidationSchema = z
	.object({
		name: z.string().min(1).optional(),
		surname: z.string().min(1).optional(),
		email: z.string().email().optional(),
		password: z.string().min(6).optional()
	})
	.strict()

export type UpdateUserDTO = z.infer<typeof updateUserValidationSchema>

export const findUserByEmailValidationSchema = z
	.object({
		email: z.string().email()
	})
	.strict()

export type FindUserByEmailDTO = z.infer<typeof findUserByEmailValidationSchema>
