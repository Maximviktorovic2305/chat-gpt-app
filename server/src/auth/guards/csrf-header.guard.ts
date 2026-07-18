import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import type { Request } from 'express'

@Injectable()
export class CsrfHeaderGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>()
		if (request.get('X-Requested-With') !== 'XMLHttpRequest') {
			throw new ForbiddenException('Недопустимый запрос')
		}
		return true
	}
}
