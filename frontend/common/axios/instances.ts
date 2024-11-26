import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: process.env.apiUrl,
	timeout: 15000
})

export default axiosInstance
