import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'
import type { NextFunction, Request, Response } from 'express'
import { AppModule } from './app.module'
import { getCorsOrigins } from './common/config/cors-origins'

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const config = app.get(ConfigService)

	app.disable('x-powered-by')
	app.set('trust proxy', Number(config.getOrThrow<string>('TRUST_PROXY_HOPS')))
	app.setGlobalPrefix('api')
	app.useBodyParser('json', { limit: '256kb' })
	app.useBodyParser('urlencoded', {
		limit: '64kb',
		extended: false,
		parameterLimit: 100,
	})
	app.use(cookieParser())
	app.use((_request: Request, response: Response, next: NextFunction) => {
		response.setHeader('Cache-Control', 'no-store')
		response.setHeader('X-Content-Type-Options', 'nosniff')
		response.setHeader('X-Frame-Options', 'DENY')
		response.setHeader('Referrer-Policy', 'no-referrer')
		response.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'")
		next()
	})
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: { enableImplicitConversion: false },
			stopAtFirstError: true,
		}),
	)
	app.enableCors({
		origin: getCorsOrigins(config),
		credentials: true,
		methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: [
			'Accept',
			'Authorization',
			'Content-Type',
			'X-Requested-With',
		],
		maxAge: 600,
	})
	app.enableShutdownHooks()

	await app.listen(Number(config.getOrThrow<string>('PORT')), '0.0.0.0')
}

void bootstrap()
