import { Types } from "mongoose";
import { Role } from "@repo/core/enums/roles";

export type JwtPayload = {
  sub: Types.ObjectId;
  email: string;
  role: Role;
};
