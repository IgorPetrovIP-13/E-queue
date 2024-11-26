import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../enums/role-enum";

export const Role = (role: `${RoleEnum}`) => SetMetadata('role', role);