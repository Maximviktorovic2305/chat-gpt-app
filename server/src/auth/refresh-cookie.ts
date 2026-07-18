import type { ConfigService } from '@nestjs/config'
import type { CookieOptions, Request, Response } from 'express'
import { REFRESH_TOKEN_TTL_MS } from './auth-token.config'

export const REFRESH_COOKIE_NAME = 'aicontact_refresh_token'
export const REFRESH_COOKIE_PATH = '/api/auth'

const refreshCookieOptions = (config: ConfigService): CookieOptions => ({
	httpOnly: true,
	secure:
		config.get<string>('COOKIE_SECURE')?.toLowerCase() === 'true' ||
		config.get<string>('NODE_ENV') === 'production',
	sameSite: 'lax',
	path: REFRESH_COOKIE_PATH,
	maxAge: REFRESH_TOKEN_TTL_MS,
})

export const setRefreshCookie = (
	response: Response,
	token: string,
	config: ConfigService,
): void => {
	response.cookie(REFRESH_COOKIE_NAME, token, refreshCookieOptions(config))
}

export const clearRefreshCookie = (
	response: Response,
	config: ConfigService,
): void => {
	const options = refreshCookieOptions(config)
	delete options.maxAge
	response.clearCookie(REFRESH_COOKIE_NAME, options)
}

export const readRefreshCookie = (request: Request): string | undefined => {
	const cookies = request.cookies as Record<string, unknown> | undefined
	const value = cookies?.[REFRESH_COOKIE_NAME]
	return typeof value === 'string' ? value : undefined
}
