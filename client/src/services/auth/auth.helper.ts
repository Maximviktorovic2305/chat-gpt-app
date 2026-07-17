'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token.constants'
import { IAuthResponse, ITokens } from '@/types'

let accessToken: string | null = null

const clearLegacyStorage = () => {
	if (typeof window === 'undefined') return

	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
	localStorage.removeItem('user')
}

export const saveTokensStorage = (data: ITokens) => {
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

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
}
