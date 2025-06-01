import { z } from "zod";

export const signUpValidationSchema = z
  .object({
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
  })
  .strict();

export const signInValidationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6)
  })
  .strict();

export const refreshValidationSchema = z
  .object({
    sub: z.string(),
    refreshToken: z.string()
  })
  .strict();

export const logoutValidationSchema = z
  .object({
    sub: z.string()
  })
  .strict();
