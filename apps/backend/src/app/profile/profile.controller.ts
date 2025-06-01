import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";
import { ProfileService } from "./profile.service";
import { Response } from "express";
import { ZodValidationPipe } from "../core/common/pipes/zod-validation.pipe";
import { IUserRequest } from "@repo/core/types/user-request.types";
import { Tokens } from "@repo/core/enums/tokens";
import { updateProfileValidationSchema } from "@repo/api/services/profile/profile.validation";
import { IUpdateProfileReq } from "@repo/api/services/profile/profile.types";

@UseGuards(AccessTokenGuard)
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  get(@Req() req: IUserRequest) {
    return this.profileService.get(req.user.sub);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Req() req: IUserRequest, @Res() res: Response) {
    res.clearCookie(Tokens.REFRESH_TOKEN);
    return this.profileService.delete(req.user.sub);
  }

  @Put()
  update(
    @Req() req: IUserRequest,
    @Body(new ZodValidationPipe(updateProfileValidationSchema))
    data: IUpdateProfileReq
  ) {
    return this.profileService.update(req.user.sub, data);
  }
}
