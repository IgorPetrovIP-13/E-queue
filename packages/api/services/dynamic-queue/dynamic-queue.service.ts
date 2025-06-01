import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";
import { ICreateDynamicQueueReq } from "./dynamic-queue.types";

class DynamicQueueService {
  private readonly baseUrl = "/dynamic-queues";

  async createDynamicQueue(data: ICreateDynamicQueueReq) {
    const response = await axiosWithCredentialsInstance.post<void>(
      `${this.baseUrl}`,
      data
    );

    return response.data;
  }

	async getAsExecutor() {
		const response = await axiosWithCredentialsInstance.get<any>(
			`${this.baseUrl}/as-executor`
		);

		return response.data;
	}

	async getAsClient() {
		const response = await axiosWithCredentialsInstance.get<any>(
			`${this.baseUrl}/as-client`
		);

		return response.data;
	}

	async getAsExecutorById(id: string) {
		const response = await axiosWithCredentialsInstance.get<any>(
			`${this.baseUrl}/as-executor/${id}`
		);

		return response.data;
	}

	async getAsClientById(id: string) {
		const response = await axiosWithCredentialsInstance.get<any>(
			`${this.baseUrl}/as-client/${id}`
		);

		return response.data;
	}

	async addAppointmentToDynamicQueue(
		id: string,
		email: string
	) {
		const response = await axiosWithCredentialsInstance.put<any>(
			`${this.baseUrl}/add-appointment/${id}`,
			{ email }
		);

		return response.data;
	}

	async deleteAppointmentFromDynamicQueue(
		id: string,
		userId: string
	) {
		const response = await axiosWithCredentialsInstance.put<any>(
			`${this.baseUrl}/delete-appointment/${id}`,
			{ userId }
		);

		return response.data;
	}

	async deleteMyAppointmentFromDynamicQueue(id: string) {
		const response = await axiosWithCredentialsInstance.put<any>(
			`${this.baseUrl}/delete-my-appointment/${id}`
		)
		return response.data;
	}

	async deleteDynamicQueue(id: string) {
		const response = await axiosWithCredentialsInstance.delete<any>(
			`${this.baseUrl}/${id}`
		);

		return response.data;
	}
}

export const dynamicQueueService = new DynamicQueueService();
