import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";
import { OrganizationRequestService } from "./organization_request.service";
import { ZodValidationPipe } from "../core/common/pipes/zod-validation.pipe";
import { IUserRequest } from "@repo/core/types/user-request.types";
import { createOrganizationRequestValidationSchema } from "@repo/api/services/organization-request/organization-request.validation";
import { ICreateOrganizationRequestReq } from "@repo/api/services/organization-request/organization-request.types";
import { RolesGuard } from "../core/common/guards/roles.guard";
import { Roles } from "@repo/core/enums/roles";
import { RolesRequired } from "../core/common/decorators/roles.decorator";
import { Types } from "mongoose";

@UseGuards(AccessTokenGuard)
@Controller("organization-requests")
export class OrganizationRequestController {
  constructor(
    private readonly organizationRequestService: OrganizationRequestService
  ) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createOrganizationRequestValidationSchema))
    data: ICreateOrganizationRequestReq,
    @Req() req: IUserRequest
  ) {
    const user_id = req.user.sub;
    return this.organizationRequestService.create({ user_id, ...data });
  }

  @Get("my-requests")
  async findMyRequests(@Req() req: IUserRequest) {
    return this.organizationRequestService.findMyRequests(req.user.sub);
  }

  @Get("available-requests")
  @RolesRequired(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async findAvailableRequests() {
    return this.organizationRequestService.findAvailableRequests();
  }

  @Get("requests-under-my-review")
  @RolesRequired(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async findRequestsUnderMyReview(@Req() req: IUserRequest) {
    return this.organizationRequestService.findRequestsUnderMyReview(
      req.user.sub
    );
  }

  @Get(":id")
  async findById(@Param("id") id: Types.ObjectId) {
    return this.organizationRequestService.findById(id);
  }

	@Put(":id/approve")
	@RolesRequired(Roles.ADMIN)
	@UseGuards(RolesGuard)
	async approve(
		@Param("id") id: Types.ObjectId,
		@Body() body: { comment: string },
	) {
		return this.organizationRequestService.approve(id, body.comment);
	}

	@Put(":id/reject")
	@RolesRequired(Roles.ADMIN)
	@UseGuards(RolesGuard)
	async reject(
		@Param("id") id: Types.ObjectId,
		@Body() body: { comment: string },
	) {
		return this.organizationRequestService.reject(id, body.comment);
	}

  @Get(":id/status")
  @RolesRequired(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async findStatusById(@Param("id") id: Types.ObjectId) {
    return this.organizationRequestService.findStatusById(id);
  }

  @Put(":id/leave-comment")
  async leaveComment(
    @Param("id") id: Types.ObjectId,
    @Body() body: { comment: string },
    @Req() req: IUserRequest
  ) {
    return this.organizationRequestService.leaveComment(
      id,
      req.user.role,
      body.comment
    );
  }

  @Put(":id/take-into-processing")
  @RolesRequired(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async takeIntoProcessing(
    @Param("id") id: Types.ObjectId,
    @Req() req: IUserRequest
  ) {
    return this.organizationRequestService.takeIntoProcessing(id, req.user.sub);
  }
}
