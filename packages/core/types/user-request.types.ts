import { JwtPayload } from "./jwt-payload.types";
import { Request } from "express";

export interface IUserRequest extends Request {
  user: JwtPayload;
}