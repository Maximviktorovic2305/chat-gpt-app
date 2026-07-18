import axios, { type InternalAxiosRequestConfig } from 'axios'
import { getContentType } from '@/shared/api'
import {
	getAccessToken,
	removeFromStorage,
	saveToStorage,
} from '../model/auth-session'
import type { AuthResponse } from '../model/types'

const apiBaseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}/api`

export const publicApi = axios.create({
	baseURL: apiBaseUrl,
	headers: getContentType(),
	withCredentials: true,
})

export const authenticatedApi = axios.create({
	baseURL: apiBaseUrl,
	headers: getContentType(),
	withCredentials: true,
})

let refreshPromise: Promise<void> | null = null

const refreshAccessToken = () => {
	if (!refreshPromise) {
		refreshPromise = publicApi
			.post<AuthResponse>('/auth/refresh', null, {
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
			})
			.then(response => saveToStorage(response.data))
			.finally(() => {
				refreshPromise = null
			})
	}

	return refreshPromise
}

authenticatedApi.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const accessToken = getAccessToken()
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
		return config
	},
)

authenticatedApi.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error?.config as
			| (InternalAxiosRequestConfig & { _isRetry?: boolean })
			| undefined

		if (error?.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
			originalRequest._isRetry = true
			try {
				await refreshAccessToken()
				return authenticatedApi.request(originalRequest)
			} catch {
				removeFromStorage()
			}
		}

		return Promise.reject(error)
	},
)
