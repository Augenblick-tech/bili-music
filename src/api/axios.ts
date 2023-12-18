import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axios.create({
	baseURL: 'https://api.bilibili.com',
	timeout: 10000,
	withCredentials: true,
})

instance.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		return Promise.reject(error)
	}
)

export const request = <T>(
	config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
	return instance.request<T>(config)
}

export default instance
