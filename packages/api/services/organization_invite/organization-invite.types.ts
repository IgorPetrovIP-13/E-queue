import { OrganizationRoles } from "@repo/core/enums/org-roles";
import { Types } from "mongoose";

export interface IInviteOrganizationReq {
  organization_id: string;
  invitation_comment: string;
  ivitation_role: OrganizationRoles.ADMIN | OrganizationRoles.MEMBER;
  user_email: string;
}

export interface IGetOrganizationInvitesRes {
	_id: string;
  invitation_comment: string;
  ivitation_role: OrganizationRoles.ADMIN | OrganizationRoles.MEMBER;
  organization_id: {
    _id: string;
    organization_logo: string | null;
    organization_type_id: {
      _id: string;
      title: string;
    };
    organization_description: string;
    organization_website: string | null;
    organization_title: string;
    members: {
      _id: string;
      user_id: string;
      organization_id: string;
      organization_role: string;
    }[];
    static_queues: Types.ObjectId[];
    dynamic_queues: Types.ObjectId[];
  };
	user_email: string;
	user_id: {
		_id: string;
		name: string;
		surname: string;
	}
}
