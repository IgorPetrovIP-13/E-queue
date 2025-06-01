import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";
import { IGetOrganizationRes } from "./organization.types";

class OrganizationService {
	private readonly BASE_URL = "/organizations";

	async getMyOrganizations() {
		const response = await axiosWithCredentialsInstance.get<IGetOrganizationRes[]>(
			`${this.BASE_URL}/my-organizations`
		);

		return response.data;
	}
}

export const organizationService = new OrganizationService();