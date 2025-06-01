import { OrganizationRoles } from "@repo/core/enums/org-roles";

export const initialValues = {
  organization_id: "",
  invitation_comment: "",
  ivitation_role: OrganizationRoles.MEMBER as OrganizationRoles.MEMBER | OrganizationRoles.ADMIN,
  user_email: "",
};
