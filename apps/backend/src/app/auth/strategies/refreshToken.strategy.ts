import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "../../core/config/config.service";
import { Tokens } from "@repo/core/enums/tokens";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies[Tokens.REFRESH_TOKEN]
      ]),
      secretOrKey: configService.jwtRefreshSecret
    });
  }

  validate(payload: any) {
    return payload;
  }
}
