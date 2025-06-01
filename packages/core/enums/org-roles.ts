export enum OrganizationRoles {
  OWNER = "owner",
  MEMBER = "member",
  ADMIN = "admin"
}

export type OrganizationRole =
  (typeof OrganizationRoles)[keyof typeof OrganizationRoles];
