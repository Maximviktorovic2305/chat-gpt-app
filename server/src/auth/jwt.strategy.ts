import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from '../common/database/prisma.service'
import { getAccessTokenSecret } from './auth-token.config'
import type { AuthenticatedUser } from './auth.interface'

interface AccessTokenPayload {
	sub: number
	type: 'access'
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		config: ConfigService,
		private readonly prisma: PrismaService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: getAccessTokenSecret(config),
		})
	}

	async validate(payload: AccessTokenPayload): Promise<AuthenticatedUser> {
		if (payload.type !== 'access' || !Number.isInteger(payload.sub)) {
			throw new UnauthorizedException('Недействительный токен')
		}

		const user = await this.prisma.user.findUnique({
			where: { id: payload.sub },
			select: { id: true, name: true, email: true, isAdmin: true },
		})
		if (!user) throw new UnauthorizedException('Пользователь не найден')
		return user
	}
}
