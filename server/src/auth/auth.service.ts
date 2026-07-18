import { createHash, randomUUID } from 'node:crypto'
import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { PrismaService } from '../common/database/prisma.service'
import {
	ACCESS_TOKEN_TTL,
	getAccessTokenSecret,
	getRefreshTokenSecret,
	REFRESH_TOKEN_TTL,
} from './auth-token.config'
import { LoginAuthDto, RegisterAuthDto } from './dto/create-auth.dto'

const publicUserSelect = {
	id: true,
	name: true,
	email: true,
	isAdmin: true,
} as const

interface JwtPayload {
	sub: number
	type: 'access' | 'refresh'
}

interface TokenPair {
	accessToken: string
	refreshToken: string
}

const hashRefreshToken = (token: string): string =>
	createHash('sha256').update(token).digest('hex')

@Injectable()
export class AuthService {
	private readonly dummyPasswordHash = argon2.hash(randomUUID())

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly config: ConfigService,
	) {}

	async register(dto: RegisterAuthDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: dto.email },
			select: { id: true },
		})
		if (existingUser) {
			throw new ConflictException('Пользователь с таким email уже существует')
		}

		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await argon2.hash(dto.password),
				isAdmin: false,
			},
			select: publicUserSelect,
		})
		const tokens = await this.issueTokens(user.id)
		await this.storeRefreshToken(user.id, tokens.refreshToken)

		return { user, ...tokens }
	}

	async login(dto: LoginAuthDto) {
		const userWithPassword = await this.prisma.user.findUnique({
			where: { email: dto.email },
			select: { ...publicUserSelect, password: true },
		})
		const passwordHash = userWithPassword?.password ?? (await this.dummyPasswordHash)
		const passwordIsValid = await argon2.verify(passwordHash, dto.password)

		if (!userWithPassword || !passwordIsValid) {
			throw new UnauthorizedException('Неверный email или пароль')
		}

		const user = {
			id: userWithPassword.id,
			name: userWithPassword.name,
			email: userWithPassword.email,
			isAdmin: userWithPassword.isAdmin,
		}
		const tokens = await this.issueTokens(user.id)
		await this.storeRefreshToken(user.id, tokens.refreshToken)

		return { user, ...tokens }
	}

	async getProfile(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: publicUserSelect,
		})
		if (!user) throw new UnauthorizedException('Пользователь не найден')
		return user
	}

	async refresh(refreshToken?: string) {
		const payload = await this.verifyRefreshToken(refreshToken)
		if (!refreshToken) throw new UnauthorizedException('Недействительная сессия')
		const currentHash = hashRefreshToken(refreshToken)
		const user = await this.prisma.user.findFirst({
			where: { id: payload.sub, refreshTokenHash: currentHash },
			select: publicUserSelect,
		})
		if (!user) throw new UnauthorizedException('Недействительная сессия')

		const tokens = await this.issueTokens(user.id)
		const rotation = await this.prisma.user.updateMany({
			where: { id: user.id, refreshTokenHash: currentHash },
			data: { refreshTokenHash: hashRefreshToken(tokens.refreshToken) },
		})
		if (rotation.count !== 1) {
			throw new UnauthorizedException('Недействительная сессия')
		}

		return { user, ...tokens }
	}

	async logout(refreshToken?: string): Promise<void> {
		if (!refreshToken) return

		try {
			const payload = await this.verifyRefreshToken(refreshToken)
			await this.prisma.user.updateMany({
				where: {
					id: payload.sub,
					refreshTokenHash: hashRefreshToken(refreshToken),
				},
				data: { refreshTokenHash: null },
			})
		} catch {
			// Logout remains idempotent and the controller always clears the cookie.
		}
	}

	private async issueTokens(userId: number): Promise<TokenPair> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwt.signAsync(
				{ sub: userId, type: 'access', jti: randomUUID() },
				{
					secret: getAccessTokenSecret(this.config),
					expiresIn: ACCESS_TOKEN_TTL,
				},
			),
			this.jwt.signAsync(
				{ sub: userId, type: 'refresh', jti: randomUUID() },
				{
					secret: getRefreshTokenSecret(this.config),
					expiresIn: REFRESH_TOKEN_TTL,
				},
			),
		])

		return { accessToken, refreshToken }
	}

	private async storeRefreshToken(userId: number, token: string): Promise<void> {
		await this.prisma.user.update({
			where: { id: userId },
			data: { refreshTokenHash: hashRefreshToken(token) },
		})
	}

	private async verifyRefreshToken(token?: string): Promise<JwtPayload> {
		if (!token) throw new UnauthorizedException('Недействительная сессия')

		try {
			const payload = await this.jwt.verifyAsync<JwtPayload>(token, {
				secret: getRefreshTokenSecret(this.config),
			})
			if (payload.type !== 'refresh' || !Number.isInteger(payload.sub)) {
				throw new Error('Invalid refresh payload')
			}
			return payload
		} catch {
			throw new UnauthorizedException('Недействительная сессия')
		}
	}
}
