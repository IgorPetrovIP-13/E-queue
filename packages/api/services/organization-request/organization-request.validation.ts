import { z } from "zod";
import {
  zodUrlOptional,
  zodObjectId,
  zodImage
} from "@repo/core/constants/zod.constants";

export const createOrganizationRequestValidationSchema = z
  .object({
    organization_logo: zodUrlOptional,
    organization_type_id: zodObjectId,
    organization_title: z.string().min(3).max(255),
    desired_connection: z.string().min(3).max(255),
    organization_description: z.string().min(3).max(1000),
    organization_website: zodUrlOptional,
    user_comment: z.string().max(1000),
    attachments: z.array(z.any()).max(10)
  })
  .strict();

export const createOrganizationRequestClientValidationSchema = z
  .object({
    organization_logo: zodImage.nullable(),
    organization_type_id: zodObjectId,
    organization_title: z.string().min(3).max(255),
    desired_connection: z.string().min(3).max(255),
    organization_description: z.string().min(3).max(1000),
    organization_website: zodUrlOptional,
    user_comment: z.string().max(1000),
    attachments: z.array(z.any()).max(10)
  })
  .strict();

export type CreateOrganizationRequesttClientValidationSchema = z.infer<
  typeof createOrganizationRequestClientValidationSchema
>;
