import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from "@nestjs/common";
import { Request } from "express";
import { Tokens } from "@repo/core/enums/tokens";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies[Tokens.REFRESH_TOKEN];
    if (!refreshToken) {
      throw new ForbiddenException("Ви не маєте прав доступу до цього ресурсу");
    }
    return true;
  }
}
