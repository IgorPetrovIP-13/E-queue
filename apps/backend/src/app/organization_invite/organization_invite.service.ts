import { Injectable } from "@nestjs/common";
import { IInviteOrganizationReq } from "@repo/api/services/organization_invite/organization-invite.types";
import { Types } from "mongoose";
import { OrganizationInviteRepository } from "./organization_invite.repository";

@Injectable()
export class OrganizationInviteService {
  constructor(
    private readonly organizationInviteRepository: OrganizationInviteRepository
  ) {}

  async sendInvite(user_id: Types.ObjectId, body: IInviteOrganizationReq) {
    const newData = {
      user_id: user_id,
      organization_id: body.organization_id,
      invitation_comment: body.invitation_comment,
      ivitation_role: body.ivitation_role,
      user_email: body.user_email
    };

    return this.organizationInviteRepository.sendInvite(newData);
  }

	async findMyInvites(user_email: string) {
		return this.organizationInviteRepository.findMyInvites(user_email);
	}
}
