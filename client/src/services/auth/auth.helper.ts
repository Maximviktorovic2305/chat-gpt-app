'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token.constants'
import { IAuthResponse, ITokens } from '@/types'

export const saveTokensStorage = (data: ITokens) => {
	localStorage.setItem(ACCESS_TOKEN, data.accessToken)
	localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
	localStorage.removeItem('user')
}

export const getAccessToken = () => {
	const accessToken = localStorage.getItem(ACCESS_TOKEN)
	return accessToken || null
}
export const getRefreshToken = () => {
	const refreshToken = localStorage.getItem(REFRESH_TOKEN)
	return refreshToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
