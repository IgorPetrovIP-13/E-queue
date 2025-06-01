import axios from "axios";
import { axiosDefaults } from "./axios-defaults";

export const axiosNoCredentialsInstance = axios.create(axiosDefaults);
