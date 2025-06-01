import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrganizationInviteService } from './organization_invite.service';
import { IInviteOrganizationReq } from '@repo/api/services/organization_invite/organization-invite.types';
import { IUserRequest } from '@repo/core/types/user-request.types';
import { AccessTokenGuard } from '../core/common/guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('organization-invites')
export class OrganizationInviteController {
  constructor(private readonly organizationInviteService: OrganizationInviteService) {}

	@Get("my-invites")
	async findMyInvites(@Req() req: IUserRequest) {
		return this.organizationInviteService.findMyInvites(req.user.email);
	}

	@Post("send-invite")
	async sendInvite(@Body() body: IInviteOrganizationReq, @Req() req: IUserRequest) {
		return this.organizationInviteService.sendInvite(req.user.sub, body);
	}
}
