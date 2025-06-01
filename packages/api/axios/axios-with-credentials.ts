import axios from "axios";
import { axiosDefaults } from "./axios-defaults";
import { authTokenService } from "../services/auth-token";
import { authService } from "../services/auth";

export const axiosWithCredentialsInstance = axios.create(axiosDefaults);

axiosWithCredentialsInstance.interceptors.request.use(config => {
  const accessToken = authTokenService.getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosWithCredentialsInstance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authService.refresh();
        return axiosWithCredentialsInstance.request(originalRequest);
      } catch (error) {
        authTokenService.removeAccessToken();
      }
    }
    throw error;
  }
);
