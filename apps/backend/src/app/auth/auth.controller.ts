import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { Request, Response } from "express";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";
import { RefreshTokenGuard } from "../core/common/guards/refreshToken.guard";
import {
  createUserValidationSchema,
  CreateUserDTO
} from "../../app/user/user.dto";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from "../core/common/pipes/zod-validation.pipe";
import { Tokens, TokensExpiration } from "@repo/core/enums/tokens";
import { ConfigService } from "../core/config/config.service";
import { signInValidationSchema } from "@repo/api/services/auth/auth.validation";
import { ISignInReq } from "@repo/api/services/auth/auth.types";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @Post("signup")
  async signUp(
    @Body(new ZodValidationPipe(createUserValidationSchema))
    body: CreateUserDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, tokens } = await this.authService.signUp(body);
    this.setAuthCookies(res, tokens.refreshToken);
    return { user, accessToken: tokens.accessToken };
  }

  @Put("signin")
  async signIn(
    @Body(new ZodValidationPipe(signInValidationSchema)) body: ISignInReq,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, tokens } = await this.authService.signIn(body);
    this.setAuthCookies(res, tokens.refreshToken);
    return { user, accessToken: tokens.accessToken };
  }

	@Put("signin-admin")
	async signInAdmin(
		@Body(new ZodValidationPipe(signInValidationSchema)) body: ISignInReq,
		@Res({ passthrough: true }) res: Response
	) {
		const { user, tokens } = await this.authService.signInAdmin(body);
		this.setAuthCookies(res, tokens.refreshToken);
		return { user, accessToken: tokens.accessToken };
	}

  @UseGuards(RefreshTokenGuard)
  @Put("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies[Tokens.REFRESH_TOKEN];
    const tokens = await this.authService.refresh(refreshToken);
    this.setAuthCookies(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @Put("logout")
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie(Tokens.REFRESH_TOKEN);
  }

  private setAuthCookies(res: Response, refreshToken: string) {
    res.cookie(Tokens.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: TokensExpiration.REFRESH_TOKEN,
      path: "/"
    });
  }
}
