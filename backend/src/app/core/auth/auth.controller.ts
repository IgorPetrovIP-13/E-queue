import {
	Body,
	Controller,
	Post,
	Put,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AccessTokenGuard } from '../common/guards/accessToken.guard'
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard'
import {
	createUserValidationSchema,
	CreateUserDTO
} from 'src/app/user/user.dto'
import { AuthService } from './auth.service'
import { SignInDTO, signInValidationSchema } from './auth.dto'
import { ZodValidationPipe } from '../common/pipes/validation.pipe'
import { TokensEnum } from '../common/enums/tokens-enum'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	async signUp(
		@Body(new ZodValidationPipe(createUserValidationSchema))
		body: CreateUserDTO,
		@Res({ passthrough: true }) res: Response
	) {
		const { user, tokens } = await this.authService.signUp(body)
		this.setAuthCookies(res, tokens.refreshToken)
		return { user, accessToken: tokens.accessToken }
	}

	@Put('signin')
	async signIn(
		@Body(new ZodValidationPipe(signInValidationSchema)) body: SignInDTO,
		@Res({ passthrough: true }) res: Response
	) {
		const { user, tokens } = await this.authService.signIn(body)
		this.setAuthCookies(res, tokens.refreshToken)
		return { user, accessToken: tokens.accessToken }
	}

	@UseGuards(RefreshTokenGuard)
	@Put('refresh')
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshToken = req.cookies[TokensEnum.REFRESH_TOKEN]
		const tokens = await this.authService.refresh(refreshToken)
		this.setAuthCookies(res, tokens.refreshToken)
		return { accessToken: tokens.accessToken }
	}

	@UseGuards(AccessTokenGuard)
	@Put('logout')
	logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		res.clearCookie(TokensEnum.REFRESH_TOKEN)
	}

	private setAuthCookies(res: Response, refreshToken: string) {
		res.cookie(TokensEnum.REFRESH_TOKEN, refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		})
	}
}
