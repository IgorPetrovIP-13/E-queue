import { z } from "zod";
import { zodUrlOptional } from "@repo/core/constants/zod.constants";

export const updateProfileValidationSchema = z
  .object({
    avatar: zodUrlOptional,
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email()
  })
  .strict();
