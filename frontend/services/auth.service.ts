import { axiosNoCredentialsInstance, axiosWithCredentialsInstance } from '@/common/axios/interceptors'
import { ISignInReq, ISignUpReq, ISignUpRes } from '@/types/services/auth.types'
import { removeAccessToken, setAccessToken } from './auth-token.service'

class AuthService {

	private BASE_URL = '/auth'

	async signIn(data: ISignInReq) {
		const response = await axiosNoCredentialsInstance.put<ISignUpRes>(
			`${this.BASE_URL}/signin`,
			data
		)
		setAccessToken(response.data.accessToken)
		return response.data.user
	}

	async signUp(data: ISignUpReq) {
		const response = await axiosNoCredentialsInstance.post<ISignUpRes>(
			`${this.BASE_URL}/signup`,
			data
		)
		setAccessToken(response.data.accessToken)
		return response.data.user
	}

	async refresh() {
		const response = await axiosNoCredentialsInstance.put<ISignUpRes>(
			`${this.BASE_URL}/refresh`
		)
		setAccessToken(response.data.accessToken)
	}

	async logout() {
		await axiosWithCredentialsInstance.put(`${this.BASE_URL}/logout`)
		removeAccessToken()
	}
}

export const authService = new AuthService();
