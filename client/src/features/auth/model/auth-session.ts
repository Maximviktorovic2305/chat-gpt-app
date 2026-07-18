'use client'

import type { AuthResponse, AuthTokens } from './types'

let accessToken: string | null = null

const clearLegacyStorage = () => {
	if (typeof window === 'undefined') return

	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	localStorage.removeItem('user')
}

export const saveTokensStorage = (data: AuthTokens) => {
	accessToken = data.accessToken
	clearLegacyStorage()
}

export const removeFromStorage = () => {
	accessToken = null
	clearLegacyStorage()
}

export const getAccessToken = () =>
	typeof window === 'undefined' ? null : accessToken

export const getRefreshToken = () => null

export const getUserFromStorage = () => null

export const saveToStorage = (data: AuthResponse) => {
	saveTokensStorage(data)
}
