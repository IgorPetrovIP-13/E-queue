import { Controller, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";

@UseGuards(AccessTokenGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
}
