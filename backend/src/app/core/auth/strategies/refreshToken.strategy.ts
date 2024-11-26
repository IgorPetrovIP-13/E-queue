import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '../../config/config.service'
import { TokensEnum } from '../../common/enums/tokens-enum'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req.cookies[TokensEnum.REFRESH_TOKEN]
			]),
			secretOrKey: configService.jwtRefreshSecret
		})
	}

	validate(payload: any) {
		return payload
	}
}
