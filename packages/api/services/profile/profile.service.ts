import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";
import {
  IGetProfileRes,
  IUpdateProfileReq,
  IUpdateProfileRes
} from "./profile.types";
import { authTokenService } from "../auth-token";

class ProfileService {
  private readonly BASE_URL = "/profile";

  async getProfile() {
    const response = await axiosWithCredentialsInstance.get<IGetProfileRes>(
      `${this.BASE_URL}`
    );

    return response.data;
  }

  async deleteProfile() {
    const response = await axiosWithCredentialsInstance.delete<void>(
      `${this.BASE_URL}`
    );

    authTokenService.removeAccessToken();

    return response.data;
  }

  async updateProfile(data: IUpdateProfileReq) {
    const response = await axiosWithCredentialsInstance.put<IUpdateProfileRes>(
      `${this.BASE_URL}`,
      data
    );

    return response.data;
  }
}

export const profileService = new ProfileService();
