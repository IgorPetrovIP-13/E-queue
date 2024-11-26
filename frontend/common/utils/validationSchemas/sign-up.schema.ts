import { z } from 'zod'

const signUpSchema = z
	.object({
		name: z
			.string()
			.min(1, 'Мінімальна довжина 1 символ')
			.max(255, 'Максимальна довжина 255 символів'),
		surname: z
			.string()
			.min(1, 'Мінімальна довжина 1 символ')
			.max(255, 'Максимальна довжина 255 символів'),
		email: z
			.string()
			.email('Невірний формат email')
			.max(255, 'Максимальна довжина 255 символів'),
		password: z
			.string()
			.min(6, 'Мінімальна довжина 6 символів')
			.max(25, 'Максимальна довжина 25 символів'),
		confirmPassword: z
			.string()
			.min(6, 'Мінімальна довжина 6 символів')
			.max(25, 'Максимальна довжина 25 символів')
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'Паролі не співпадають'
			})
		}
	})

export default signUpSchema
