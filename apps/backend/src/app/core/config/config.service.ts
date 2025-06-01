import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService extends NestConfigService {
  constructor() {
    super();
  }

  get nodeEnv() {
    return this.getOrThrow<string>("NODE_ENV");
  }

  get dbHost() {
    return this.getOrThrow<string>("DATABASE_HOST");
  }

  get clientHost(): string {
    return this.getOrThrow<string>("CLIENT_HOST");
  }

  get jwtSecret(): string {
    return this.getOrThrow<string>("JWT_SECRET");
  }

  get jwtRefreshSecret(): string {
    return this.getOrThrow<string>("JWT_REFRESH_SECRET");
  }

  get recapchaSecret(): string {
    return this.getOrThrow<string>("RECAPCHA_SECRET");
  }
}
