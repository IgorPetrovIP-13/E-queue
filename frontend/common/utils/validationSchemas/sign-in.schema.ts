import { z } from 'zod'

const signInSchema = z.object({
	email: z
		.string()
		.email('Невірний формат email')
		.max(255, 'Максимальна довжина 255 символів'),
	password: z
		.string()
		.min(6, 'Мінімальна довжина 6 символів')
		.max(25, 'Максимальна довжина 25 символів')
})

export default signInSchema
