import { z } from 'zod'

export const signInValidationSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6)
	})
	.strict()

export type SignInDTO = z.infer<typeof signInValidationSchema>

export const refreshTokensValidationSchema = z
	.object({
		sub: z.string(),
		refreshToken: z.string()
	})
	.strict()

export const logoutValidationSchema = z
	.object({
		sub: z.string()
	})
	.strict()
