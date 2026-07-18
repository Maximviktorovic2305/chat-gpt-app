import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Throttle } from '@nestjs/throttler'
import type { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/user.decorator'
import { Auth } from './decorators/auth.decorator'
import { LoginAuthDto, RegisterAuthDto } from './dto/create-auth.dto'
import { CsrfHeaderGuard } from './guards/csrf-header.guard'
import {
	clearRefreshCookie,
	readRefreshCookie,
	setRefreshCookie,
} from './refresh-cookie'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly config: ConfigService,
	) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(CsrfHeaderGuard)
	@Throttle({ default: { limit: 5, ttl: 60_000 } })
	async register(
		@Body() dto: RegisterAuthDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const result = await this.authService.register(dto)
		setRefreshCookie(response, result.refreshToken, this.config)
		return { user: result.user, accessToken: result.accessToken }
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@UseGuards(CsrfHeaderGuard)
	@Throttle({ default: { limit: 5, ttl: 60_000 } })
	async login(
		@Body() dto: LoginAuthDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const result = await this.authService.login(dto)
		setRefreshCookie(response, result.refreshToken, this.config)
		return { user: result.user, accessToken: result.accessToken }
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@UseGuards(CsrfHeaderGuard)
	@Throttle({ default: { limit: 10, ttl: 60_000 } })
	async refresh(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		const result = await this.authService.refresh(readRefreshCookie(request))
		setRefreshCookie(response, result.refreshToken, this.config)
		return { user: result.user, accessToken: result.accessToken }
	}

	@Post('logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(CsrfHeaderGuard)
	@Throttle({ default: { limit: 10, ttl: 60_000 } })
	async logout(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	): Promise<void> {
		await this.authService.logout(readRefreshCookie(request))
		clearRefreshCookie(response, this.config)
	}

	@Get('me')
	@Auth()
	getProfile(@CurrentUser('id') userId: number) {
		return this.authService.getProfile(userId)
	}
}
