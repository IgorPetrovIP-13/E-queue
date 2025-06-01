import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";
import { axiosNoCredentialsInstance } from "../../axios/axios-no-credentials";

import { authTokenService } from "../auth-token";
import {
  IRefreshRes,
  ISignInReq,
  ISignInRes,
  ISignUpReq,
  ISignUpRes
} from "./auth.types";

class AuthService {
  private readonly BASE_URL = "/auth";

  async signIn(data: ISignInReq) {
    const response = await axiosNoCredentialsInstance.put<ISignInRes>(
      `${this.BASE_URL}/signin`,
      data
    );

    authTokenService.setAccessToken(response.data.accessToken);

    return response.data.user;
  }

	async signInAdmin(data: ISignInReq) {
		const response = await axiosNoCredentialsInstance.put<ISignInRes>(
			`${this.BASE_URL}/signin-admin`,
			data
		);

		authTokenService.setAccessToken(response.data.accessToken);

		return response.data.user;
	}

  async signUp(data: ISignUpReq) {
    const response = await axiosNoCredentialsInstance.post<ISignUpRes>(
      `${this.BASE_URL}/signup`,
      data
    );

    authTokenService.setAccessToken(response.data.accessToken);

    return response.data.user;
  }

  async refresh() {
    const response = await axiosNoCredentialsInstance.put<IRefreshRes>(
      `${this.BASE_URL}/refresh`
    );

    authTokenService.setAccessToken(response.data.accessToken);
  }

  async logout() {
    await axiosWithCredentialsInstance.put<void>(`${this.BASE_URL}/logout`);
    authTokenService.removeAccessToken();
  }
}

export const authService = new AuthService();
