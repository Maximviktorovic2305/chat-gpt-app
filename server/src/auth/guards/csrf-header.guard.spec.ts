import { ForbiddenException } from '@nestjs/common'
import type { ExecutionContext } from '@nestjs/common'
import { CsrfHeaderGuard } from './csrf-header.guard'

const createContext = (header?: string): ExecutionContext =>
	({
		switchToHttp: () => ({
			getRequest: () => ({
				get: () => header,
			}),
		}),
	}) as ExecutionContext

describe('CsrfHeaderGuard', () => {
	const guard = new CsrfHeaderGuard()

	it('allows the explicit AJAX header', () => {
		expect(guard.canActivate(createContext('XMLHttpRequest'))).toBe(true)
	})

	it('rejects requests without the header', () => {
		expect(() => guard.canActivate(createContext())).toThrow(ForbiddenException)
	})
})
