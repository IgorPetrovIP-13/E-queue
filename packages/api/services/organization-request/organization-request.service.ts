import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";

import {
  ICreateOrganizationRequestReq,
  ICreateOrganizationRequestRes,
  IGetAvailableOrganizationRequestRes,
  IGetMyOrganizationRequestRes
} from "./organization-request.types";

class OrganizationRequestService {
  private readonly BASE_URL = "/organization-requests";

  async create(data: ICreateOrganizationRequestReq) {
    const response =
      await axiosWithCredentialsInstance.post<ICreateOrganizationRequestRes>(
        `${this.BASE_URL}`,
        data
      );

    return response.data;
  }

  async getMyRequests() {
    const response = await axiosWithCredentialsInstance.get<
      IGetMyOrganizationRequestRes[]
    >(`${this.BASE_URL}/my-requests`);

    return response.data;
  }

  async getAvailableRequests() {
    const response = await axiosWithCredentialsInstance.get<
      IGetAvailableOrganizationRequestRes[]
    >(`${this.BASE_URL}/available-requests`);

    return response.data;
  }

  async getById(id: string) {
    const response =
      await axiosWithCredentialsInstance.get<IGetAvailableOrganizationRequestRes>(
        `${this.BASE_URL}/${id}`
      );

    return response.data;
  }

  async leaveComment(id: string, comment: string) {
    const response =
      await axiosWithCredentialsInstance.put<IGetAvailableOrganizationRequestRes>(
        `${this.BASE_URL}/${id}/leave-comment`,
        { comment }
      );

    return response.data;
  }

  async takeIntoProcessing(id: string) {
    const response = await axiosWithCredentialsInstance.put<ICreateOrganizationRequestRes>(
      `${this.BASE_URL}/${id}/take-into-processing`
    );

    return response.data;
  }

	async getRequestsUnderMyReview() {
		const response = await axiosWithCredentialsInstance.get<IGetAvailableOrganizationRequestRes[]>(
			`${this.BASE_URL}/requests-under-my-review`
		);

		return response.data;
	}

	async getStatusById(id: string) {
		const response = await axiosWithCredentialsInstance.get<IGetAvailableOrganizationRequestRes>(
			`${this.BASE_URL}/${id}/status`
		);

		return response.data;
	}

	async approve(id: string, comment: string) {
		const response =
			await axiosWithCredentialsInstance.put(
				`${this.BASE_URL}/${id}/approve`,
				{ comment }
			);

		return response.data;
	}

	async reject(id: string, comment: string) {
		const response =
			await axiosWithCredentialsInstance.put(
				`${this.BASE_URL}/${id}/reject`,
				{ comment }
			);

		return response.data;
	}
}

export const organizationRequestService = new OrganizationRequestService();
