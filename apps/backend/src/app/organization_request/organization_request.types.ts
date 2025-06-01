import { ICreateOrganizationRequestReq } from "@repo/api/services/organization-request/organization-request.types";
import { Types } from "mongoose";

export interface ICreateOrganizationRequestWithUserId
  extends ICreateOrganizationRequestReq {
  user_id: Types.ObjectId;
}

export interface IComment {
	comment: string;
	createdAt: string;
	isAdmin: boolean;
}