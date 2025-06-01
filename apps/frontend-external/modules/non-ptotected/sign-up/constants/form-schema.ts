import { signUpValidationSchema as initSchema } from "@repo/api/services/auth/auth.validation";
import { z } from "zod";

export const signUpValidationSchema = initSchema
  .extend({
    confirmPassword: z.string().min(6)
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"]
  });

export type IFormValues = z.infer<typeof signUpValidationSchema>;
