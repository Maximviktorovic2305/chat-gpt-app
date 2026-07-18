import {
	ArgumentsHost,
	Catch,
	ConflictException,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { Prisma } from '../../generated/prisma/client'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name)

	catch(exception: unknown, host: ArgumentsHost): void {
		const context = host.switchToHttp()
		const request = context.getRequest<Request>()
		const response = context.getResponse<Response>()
		const normalizedException = this.normalizeException(exception)
		const status = normalizedException.getStatus()
		const exceptionResponse = normalizedException.getResponse()
		const message =
			typeof exceptionResponse === 'string'
				? exceptionResponse
				: 'message' in exceptionResponse
					? exceptionResponse.message
					: normalizedException.message

		if (status >= 500) {
			const errorName = exception instanceof Error ? exception.name : 'UnknownError'
			this.logger.error(`${request.method} ${request.path} failed: ${errorName}`)
		}

		response.status(status).json({
			statusCode: status,
			message:
				status >= 500
					? 'Внутренняя ошибка сервера'
					: message,
		})
	}

	private normalizeException(exception: unknown): HttpException {
		if (exception instanceof HttpException) return exception
		if (
			exception instanceof Prisma.PrismaClientKnownRequestError &&
			exception.code === 'P2002'
		) {
			return new ConflictException('Ресурс уже существует')
		}
		return new HttpException(
			'Внутренняя ошибка сервера',
			HttpStatus.INTERNAL_SERVER_ERROR,
		)
	}
}
