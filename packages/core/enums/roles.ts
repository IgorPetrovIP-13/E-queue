export enum Roles {
  USER = "user",
  ADMIN = "admin"
}

export type Role = (typeof Roles)[keyof typeof Roles];
