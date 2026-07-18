import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { ChatModule } from './chat/chat.module'
import { validateEnvironment } from './common/config/validate-environment'
import { DatabaseModule } from './common/database/database.module'
import { ErrorHandlingModule } from './common/errors/error-handling.module'
import { HealthModule } from './common/health/health.module'
import { RateLimitModule } from './common/rate-limit/rate-limit.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.env.${process.env.NODE_ENV ?? 'development'}`, '.env'],
			validate: validateEnvironment,
		}),
		DatabaseModule,
		ErrorHandlingModule,
		RateLimitModule,
		HealthModule,
		AuthModule,
		UserModule,
		ChatModule,
	],
})
export class AppModule {}
