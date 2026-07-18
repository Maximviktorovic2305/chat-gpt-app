type Environment = Record<string, string | undefined>

const requiredVariables = [
	'DATABASE_URL',
	'JWT_ACCESS_SECRET',
	'JWT_REFRESH_SECRET',
	'MISTRAL_API_KEY',
	'ALLOWED_ORIGINS',
] as const

const parsePositiveInteger = (
	config: Environment,
	name: string,
	fallback: number,
): string => {
	const value = Number(config[name] ?? fallback)
	if (!Number.isInteger(value) || value <= 0) {
		throw new Error(`${name} must be a positive integer`)
	}
	return String(value)
}

const validateOrigins = (value: string): string => {
	const origins = value
		.split(',')
		.map(origin => origin.trim())
		.filter(Boolean)

	if (origins.length === 0) throw new Error('ALLOWED_ORIGINS cannot be empty')
	for (const origin of origins) {
		const url = new URL(origin)
		if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) {
			throw new Error('ALLOWED_ORIGINS must contain exact HTTP(S) origins')
		}
	}

	return origins.join(',')
}

export function validateEnvironment(config: Environment): Environment {
	for (const variable of requiredVariables) {
		if (!config[variable]) {
			throw new Error(`${variable} environment variable is required`)
		}
	}

	for (const secret of ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'] as const) {
		if ((config[secret]?.length ?? 0) < 32) {
			throw new Error(`${secret} must contain at least 32 characters`)
		}
	}
	if (config.JWT_ACCESS_SECRET === config.JWT_REFRESH_SECRET) {
		throw new Error('JWT access and refresh secrets must be different')
	}

	if (
		config.COOKIE_SECURE &&
		!['true', 'false'].includes(config.COOKIE_SECURE.toLowerCase())
	) {
		throw new Error('COOKIE_SECURE must be true or false')
	}

	const databaseUrl = new URL(config.DATABASE_URL as string)
	if (!['postgres:', 'postgresql:'].includes(databaseUrl.protocol)) {
		throw new Error('DATABASE_URL must use PostgreSQL')
	}

	return {
		...config,
		ALLOWED_ORIGINS: validateOrigins(config.ALLOWED_ORIGINS as string),
		PORT: parsePositiveInteger(config, 'PORT', 4568),
		TRUST_PROXY_HOPS: parsePositiveInteger(config, 'TRUST_PROXY_HOPS', 1),
		RATE_LIMIT_TTL_MS: parsePositiveInteger(
			config,
			'RATE_LIMIT_TTL_MS',
			60_000,
		),
		RATE_LIMIT_MAX: parsePositiveInteger(
			config,
			'RATE_LIMIT_MAX',
			60,
		),
	}
}
