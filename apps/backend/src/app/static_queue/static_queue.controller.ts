import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { StaticQueueService } from "./static_queue.service";
import { ICreateStaticQueueReq } from "@repo/api/services/static-queue/static-queue.types";
import { createStaticQueueSchema } from "@repo/api/services/static-queue/static-queue.validation";
import { ZodValidationPipe } from "../core/common/pipes/zod-validation.pipe";
import { IUserRequest } from "@repo/core/types/user-request.types";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";

@UseGuards(AccessTokenGuard)
@Controller("static-queue")
export class StaticQueueController {
  constructor(private readonly staticQueueService: StaticQueueService) {}

  @Post()
  async createStaticQueue(@Body(new ZodValidationPipe(createStaticQueueSchema)) body: ICreateStaticQueueReq) {
    return this.staticQueueService.createStaticQueue(body);
  }

	@Get("as-executor") 
	async getStaticQueueAsExecutor(@Req() req: IUserRequest) {
		return this.staticQueueService.getStaticQueueAsExecutor(req.user.sub);
	}

	@Get("as-user/:id")
	async getStaticQueueAsUser(@Param("id") id: string) {
		return this.staticQueueService.getStaticQueueAsUser(id);
	}
}
