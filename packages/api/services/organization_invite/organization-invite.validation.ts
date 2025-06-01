import { zodObjectId } from "@repo/core/constants/zod.constants";
import { OrganizationRoles } from "@repo/core/enums/org-roles";
import { z } from "zod";

export const inviteOrganizationValidationSchema = z
  .object({
    organization_id: zodObjectId,
    invitation_comment: z.string().min(3).max(1000),
    ivitation_role: z.enum([OrganizationRoles.ADMIN, OrganizationRoles.MEMBER]),
    user_email: z.string().email()
  })
  .strict();
