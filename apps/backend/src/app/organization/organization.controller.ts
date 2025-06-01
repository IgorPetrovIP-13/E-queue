import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";
import { OrganizationService } from "./organization.service";
import { IUserRequest } from "@repo/core/types/user-request.types";

@UseGuards(AccessTokenGuard)
@Controller("organizations")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

	@Get("my-organizations")
	async findMyOrganizations(@Req() req: IUserRequest) {
		const user_id = req.user.sub;
		return this.organizationService.findByUserId(user_id);
	}
}
