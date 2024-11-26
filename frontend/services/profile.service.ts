import { axiosWithCredentialsInstance } from '@/common/axios/interceptors'

class ProfileService {

	private BASE_URL = '/profile'

	async getProfile() {
		const response = await axiosWithCredentialsInstance.get(
			`${this.BASE_URL}`,
		)
		return response.data
	}
}

export const profileService = new ProfileService();
