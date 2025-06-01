import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IUserRequest } from "@repo/core/types/user-request.types";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      "roles",
      context.getHandler()
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request: IUserRequest = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException("Ви не маєте прав доступу до цього ресурсу");
    }

    return true;
  }
}
