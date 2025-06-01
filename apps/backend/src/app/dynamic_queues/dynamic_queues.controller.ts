import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
import { DynamicQueuesService } from "./dynamic_queues.service";
import { ICreateStaticQueueReq } from "@repo/api/services/static-queue/static-queue.types";
import { ZodValidationPipe } from "../core/common/pipes/zod-validation.pipe";
import { createDynamicQueueSchema } from "@repo/api/services/dynamic-queue/dynamic-queue.validation";
import { IUserRequest } from "@repo/core/types/user-request.types";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";
import { Types } from "mongoose";

@UseGuards(AccessTokenGuard)
@Controller("dynamic-queues")
export class DynamicQueuesController {
  constructor(private readonly dynamicQueuesService: DynamicQueuesService) {}

  @Post()
  async createStaticQueue(
    @Body(new ZodValidationPipe(createDynamicQueueSchema))
    body: ICreateStaticQueueReq
  ) {
    return this.dynamicQueuesService.create(body);
  }

  @Get("as-executor")
  async getDynamicQueuesAsExecutor(@Req() req: IUserRequest) {
    return this.dynamicQueuesService.getDynamicQueuesAsExecutor(req.user.sub);
  }

  @Get("as-client")
  async getDynamicQueuesAsClient(@Req() req: IUserRequest) {
    return this.dynamicQueuesService.getDynamicQueuesAsClient(req.user.sub);
  }

  @Get("as-executor/:id")
  async getDynamicQueueAsExecutor(@Param("id") id: string) {
    return this.dynamicQueuesService.getDynamicQueueAsExecutor(id);
  }

  @Get("as-client/:id")
  async getDynamicQueueAsClient(@Param("id") id: string) {
    return this.dynamicQueuesService.getDynamicQueueAsClient(id);
  }

  @Put("add-appointment/:id")
  async addAppointmentToDynamicQueue(
    @Param("id") id: string,
    @Body("email") email: string
  ) {
    return this.dynamicQueuesService.addAppointmentToDynamicQueue(id, email);
  }

  @Put("delete-appointment/:id")
  async deleteAppointmentFromDynamicQueue(
    @Param("id") id: string,
    @Body("userId") userId: Types.ObjectId
  ) {
    return this.dynamicQueuesService.deleteAppointmentFromDynamicQueue(
      id,
      userId
    );
  }

  @Put("delete-my-appointment/:id")
  async deleteMyAppointmentFromDynamicQueue(
    @Param("id") id: string,
    @Req() req: IUserRequest
  ) {
    return this.dynamicQueuesService.deleteMyAppointmentFromDynamicQueue(
      id,
      req.user.sub
    );
  }

	@Delete(":id")
	async deleteDynamicQueue(@Param("id") id: Types.ObjectId) {
		return this.dynamicQueuesService.deleteDynamicQueue(id);
	}
}
