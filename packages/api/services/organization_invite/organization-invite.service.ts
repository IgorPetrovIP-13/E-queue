import { IGetOrganizationInvitesRes, IInviteOrganizationReq } from "./organization-invite.types";
import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";

class OrganizationInviteService {
  private readonly BASE_URL = "/organization-invites";

	async findMyInvites() {
		const response = await axiosWithCredentialsInstance.get<IGetOrganizationInvitesRes[]>(
			`${this.BASE_URL}/my-invites`
		);

		return response.data;
	}

  async sendInvite(data: IInviteOrganizationReq) {

    const response = await axiosWithCredentialsInstance.post(
      `${this.BASE_URL}/send-invite`,
      data
    );

    return response.data;
	}
}

export const organizationInviteService = new OrganizationInviteService();
