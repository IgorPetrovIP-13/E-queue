import { z } from "zod";

export const updateProfileValidationSchemaClient = z
  .object({
    avatar: z.any().nullable(),
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email()
  })
  .strict();
