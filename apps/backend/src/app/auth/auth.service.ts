import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "../core/config/config.service";
import { CreateUserDTO } from "../../app/user/user.dto";
import { UserWithTokens } from "./typedefs";
import { ISignInReq } from "@repo/api/services/auth/auth.types";
import { Roles } from "@repo/core/enums/roles";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signUp(data: CreateUserDTO): Promise<UserWithTokens> {
    const userExists = await this.userService.findByEmail(data.email);
    if (userExists) {
      throw new BadRequestException(
        "Користувач вже існує, спробуйте інший email"
      );
    }

    const hash = await this.hashData(data.password);
    const newUser = await this.userService.create({ ...data, password: hash });
    const tokens = await this.getTokens(
      newUser._id,
      newUser.email,
      newUser.role
    );
    return { user: newUser, tokens };
  }

  async signIn(data: ISignInReq): Promise<UserWithTokens> {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new BadRequestException("Такого користувача не існує");
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches) throw new BadRequestException("Неправильний пароль");
    const tokens = await this.getTokens(user._id, user.email, user.role);
    return { user, tokens };
  }

  async signInAdmin(data: ISignInReq): Promise<UserWithTokens> {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new BadRequestException("Такого користувача не існує");
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches) throw new BadRequestException("Неправильний пароль");
    if (user.role !== Roles.ADMIN)
      throw new ForbiddenException("Ви не маєте доступу до цієї дії");
    const tokens = await this.getTokens(user._id, user.email, user.role);
    return { user, tokens };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.jwtRefreshSecret
      });

      const tokens = await this.getTokens(
        payload.sub,
        payload.email,
        payload.role
      );
      return tokens;
    } catch {
      throw new ForbiddenException("Невалідний рефреш токен");
    }
  }

  private async getTokens(userId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: this.configService.jwtSecret, expiresIn: "15m" }
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: this.configService.jwtRefreshSecret, expiresIn: "7d" }
      )
    ]);

    return { accessToken, refreshToken };
  }

  private hashData(data: string) {
    return argon2.hash(data);
  }
}
