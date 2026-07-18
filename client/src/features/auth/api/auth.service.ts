import type { User } from '@/entities/user'
import { removeFromStorage, saveToStorage } from '../model/auth-session'
import type {
	AuthResponse,
	LoginCredentials,
	RegisterCredentials,
} from '../model/types'
import { authenticatedApi, publicApi } from './http-client'

const csrfHeaders = { 'X-Requested-With': 'XMLHttpRequest' }

export const AuthService = {
	async register(data: RegisterCredentials): Promise<AuthResponse> {
		const response = await publicApi.post<AuthResponse>('/auth/register', data, {
			headers: csrfHeaders,
		})
		saveToStorage(response.data)
		return response.data
	},

	async login(data: LoginCredentials): Promise<AuthResponse> {
		const response = await publicApi.post<AuthResponse>('/auth/login', data, {
			headers: csrfHeaders,
		})
		saveToStorage(response.data)
		return response.data
	},

	async refresh(): Promise<AuthResponse> {
		const response = await publicApi.post<AuthResponse>('/auth/refresh', null, {
			headers: csrfHeaders,
		})
		saveToStorage(response.data)
		return response.data
	},

	async getMyProfile(): Promise<User> {
		const response = await authenticatedApi.get<User>('/auth/me')
		return response.data
	},

	async logout(): Promise<void> {
		try {
			await publicApi.post('/auth/logout', null, { headers: csrfHeaders })
		} finally {
			removeFromStorage()
		}
	},
}
