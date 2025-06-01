import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";
import { ICreateStaticQueueReq } from "./static-queue.types";

class StaticQueueService {
  private readonly baseUrl = "/static-queue";

  async createStaticQueue(data: ICreateStaticQueueReq) {
    const response = await axiosWithCredentialsInstance.post<void>(
      `${this.baseUrl}`,
      data
    );

    return response.data;
  }

  async getStaticQueueAsUser(id: string) {
    const response = await axiosWithCredentialsInstance.get(
      `${this.baseUrl}/as-user/${id}`
    );

    return response.data;
  }

  async getStaticQueueAsExecutor() {
    const response = await axiosWithCredentialsInstance.get(
      `${this.baseUrl}/as-executor`
    );

    return response.data;
  }
}

export const staticQueueService = new StaticQueueService();
