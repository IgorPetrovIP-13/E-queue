import axiosInstance from './instances'

const responseBody = <T>(response: { data: T }) => response.data

interface RequestConfig {
	params?: Record<string, any>
	body?: Record<string, any>
	headers?: Record<string, string>
}

const request = {
	get: <T>(url: string, config?: RequestConfig) =>
		axiosInstance
			.get<T>(url, {
				params: config?.params,
				headers: config?.headers
			})
			.then(responseBody),

	post: <T>(url: string, config?: RequestConfig) =>
		axiosInstance
			.post<T>(url, config?.body, {
				params: config?.params,
				headers: config?.headers
			})
			.then(responseBody),

	put: <T>(url: string, config?: RequestConfig) =>
		axiosInstance
			.put<T>(url, config?.body, {
				params: config?.params,
				headers: config?.headers
			})
			.then(responseBody),

	delete: <T>(url: string, config?: RequestConfig) =>
		axiosInstance
			.delete<T>(url, {
				params: config?.params,
				headers: config?.headers
			})
			.then(responseBody)
}

export default request
