import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import type { AuthenticatedUser } from '../auth.interface'

@Injectable()
export class OnlyAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context
			.switchToHttp()
			.getRequest<{ user?: AuthenticatedUser }>()
		if (!request.user?.isAdmin) {
			throw new ForbiddenException('Недостаточно прав')
		}
		return true
	}
}
