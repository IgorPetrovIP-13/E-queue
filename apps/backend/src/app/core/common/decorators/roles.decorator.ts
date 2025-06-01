import { SetMetadata } from "@nestjs/common";
import { Role } from "@repo/core/enums/roles";

export const RolesRequired = (...roles: Role[]) => SetMetadata("roles", roles);
