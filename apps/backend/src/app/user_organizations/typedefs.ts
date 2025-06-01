import { OrganizationRole } from "@repo/core/enums/org-roles";
import { Types } from "mongoose";

export interface CreateUserOrganizationDTO {
	organization_id: Types.ObjectId;
	user_id: Types.ObjectId;
	organization_role: OrganizationRole;
}