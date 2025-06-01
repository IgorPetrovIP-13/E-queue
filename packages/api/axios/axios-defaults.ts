import { CreateAxiosDefaults } from "axios";

export const axiosDefaults: CreateAxiosDefaults = {
  // TODO - change this to the actual url with NGINX
  baseURL: "http://localhost:3000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
};
