import { IInviteOrganizationReq } from "@repo/api/services/organization_invite/organization-invite.types";
import { Types } from "mongoose";

export interface IOrganizationInviteWithUserId
	extends IInviteOrganizationReq {
	user_id: Types.ObjectId;
}