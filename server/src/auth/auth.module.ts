import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CsrfHeaderGuard } from './guards/csrf-header.guard'
import { OnlyAdminGuard } from './guards/admin.guard'
import { JwtAuthGuard } from './guards/jwt.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		CsrfHeaderGuard,
		JwtAuthGuard,
		OnlyAdminGuard,
	],
	exports: [CsrfHeaderGuard, JwtAuthGuard, OnlyAdminGuard],
})
export class AuthModule {}
