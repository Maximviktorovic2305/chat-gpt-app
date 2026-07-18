import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Logger,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import type { Request, Response } from 'express'
import { CsrfHeaderGuard } from '../auth/guards/csrf-header.guard'
import { ChatService } from './chat.service'
import { StreamChatDto } from './dto/stream-chat.dto'

type StreamEvent =
	| { type: 'delta'; content: string }
	| { type: 'done' }
	| { type: 'error'; message: string }

@Controller('chat')
export class ChatController {
	private readonly logger = new Logger(ChatController.name)

	constructor(private readonly chatService: ChatService) {}

	@Post('stream')
	@HttpCode(200)
	@UseGuards(CsrfHeaderGuard)
	@Throttle({ default: { limit: 10, ttl: 60_000 } })
	async stream(
		@Body() dto: StreamChatDto,
		@Req() request: Request,
		@Res() response: Response,
	): Promise<void> {
		if (dto.messages.at(-1)?.role !== 'user') {
			throw new BadRequestException(
				'Последнее сообщение должно быть от пользователя',
			)
		}

		const clientId = request.ip || request.socket.remoteAddress || 'unknown'
		this.chatService.beginStream(clientId)
		response.status(200)
		response.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
		response.setHeader('Cache-Control', 'no-cache, no-transform')
		response.setHeader('Connection', 'keep-alive')
		response.setHeader('X-Accel-Buffering', 'no')
		response.flushHeaders()

		const abortController = new AbortController()
		let finished = false
		const writeEvent = (event: StreamEvent): void => {
			if (!response.writableEnded) {
				response.write(`data: ${JSON.stringify(event)}\n\n`)
			}
		}
		const heartbeat = setInterval(() => {
			if (!response.writableEnded) response.write(': ping\n\n')
		}, 15_000)
		const handleClose = (): void => {
			if (!finished) abortController.abort()
		}
		response.on('close', handleClose)

		try {
			await this.chatService.streamResponse(
				dto.messages,
				content => writeEvent({ type: 'delta', content }),
				abortController.signal,
			)
			if (!abortController.signal.aborted) writeEvent({ type: 'done' })
		} catch {
			if (!abortController.signal.aborted) {
				this.logger.error('Mistral stream failed')
				writeEvent({
					type: 'error',
					message: 'Не удалось получить ответ. Попробуйте ещё раз.',
				})
			}
		} finally {
			finished = true
			clearInterval(heartbeat)
			response.off('close', handleClose)
			this.chatService.endStream(clientId)
			if (!response.writableEnded) response.end()
		}
	}
}
