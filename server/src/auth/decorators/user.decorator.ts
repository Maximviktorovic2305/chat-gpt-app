import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { AuthenticatedUser } from '../auth.interface'

export const CurrentUser = createParamDecorator(
	(data: keyof AuthenticatedUser | undefined, context: ExecutionContext) => {
		const request = context
			.switchToHttp()
			.getRequest<{ user: AuthenticatedUser }>()
		return data ? request.user[data] : request.user
	},
)
