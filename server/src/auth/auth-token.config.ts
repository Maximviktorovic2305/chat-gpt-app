import type { ConfigService } from '@nestjs/config'

export const ACCESS_TOKEN_TTL = '15m'
export const REFRESH_TOKEN_TTL = '30d'
export const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000

export const getAccessTokenSecret = (config: ConfigService): string =>
	config.getOrThrow<string>('JWT_ACCESS_SECRET')

export const getRefreshTokenSecret = (config: ConfigService): string =>
	config.getOrThrow<string>('JWT_REFRESH_SECRET')
