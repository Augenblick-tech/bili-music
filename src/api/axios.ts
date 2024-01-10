import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

let _proxyUrl = ""
if (window.electronAPI) {
  _proxyUrl = ""
} else {
  const baseApiUrl = import.meta.env.VITE_APP_PROXY_API
  if (baseApiUrl.endsWith("/")) {
    _proxyUrl = baseApiUrl
  } else if (baseApiUrl) {
    _proxyUrl = baseApiUrl + "/"
  }
}

export const proxyUrl = _proxyUrl

const instance = axios.create({
  baseURL: `${proxyUrl}https://api.bilibili.com`,
  timeout: 10000,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const request = <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return instance.request<T>(config)
}

export default instance
