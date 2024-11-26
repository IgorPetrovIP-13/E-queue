import {
	getAccessToken,
	removeAccessToken
} from '@/services/auth-token.service'
import axios, { CreateAxiosDefaults } from 'axios'
import { formatAxiosError } from './error'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: process.env.apiUrl,
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosNoCredentialsInstance = axios.create(options)

const axiosWithCredentialsInstance = axios.create(options)

axiosWithCredentialsInstance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithCredentialsInstance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				await authService.refresh()
				return axiosWithCredentialsInstance.request(originalRequest)
			} catch (error) {
				if (formatAxiosError(error)) {
					removeAccessToken()
				}
			}
		}
		throw error
	}
)

export { axiosNoCredentialsInstance, axiosWithCredentialsInstance }
