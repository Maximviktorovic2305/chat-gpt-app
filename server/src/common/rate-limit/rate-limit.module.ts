import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

@Module({
	imports: [
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				throttlers: [
					{
						name: 'default',
						ttl: Number(
							config.getOrThrow<string>('RATE_LIMIT_TTL_MS'),
						),
						limit: Number(
							config.getOrThrow<string>('RATE_LIMIT_MAX'),
						),
					},
				],
				errorMessage: 'Слишком много запросов. Повторите попытку позже',
			}),
		}),
	],
	providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class RateLimitModule {}
