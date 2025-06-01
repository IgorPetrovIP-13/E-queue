import Cookies from "js-cookie";
import { Tokens } from "@repo/core/enums/tokens";

class AuthTokenService {
  getAccessToken() {
    const accessToken = Cookies.get(Tokens.ACCESS_TOKEN);
    return accessToken || null;
  }

  setAccessToken(accessToken: string): void {
    Cookies.set(Tokens.ACCESS_TOKEN, accessToken, {
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 15 * 60 * 1000)
    });
  }

  removeAccessToken() {
    Cookies.remove(Tokens.ACCESS_TOKEN);
  }
}

export const authTokenService = new AuthTokenService();
