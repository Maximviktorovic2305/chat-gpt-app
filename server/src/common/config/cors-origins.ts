import type { ConfigService } from '@nestjs/config'

export const getCorsOrigins = (config: ConfigService): string[] =>
	config
		.getOrThrow<string>('ALLOWED_ORIGINS')
		.split(',')
		.map(origin => origin.trim())
