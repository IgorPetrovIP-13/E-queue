import { z } from "zod";
import { updateProfileValidationSchemaClient } from "../constants/form-schema";

export type IFormValues = z.infer<typeof updateProfileValidationSchemaClient>;
