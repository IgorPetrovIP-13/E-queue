import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Request } from 'express'
import { TokensEnum } from '../enums/tokens-enum'

@Injectable()
export class RefreshTokenGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>()
		const refreshToken = request.cookies[TokensEnum.REFRESH_TOKEN]
		if (!refreshToken) {
			throw new ForbiddenException('Не надано refresh token')
		}
		return true
	}
}
