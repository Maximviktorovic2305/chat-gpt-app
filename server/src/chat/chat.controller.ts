import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ChatService } from './chat.service';
import { StreamChatDto } from './dto/stream-chat.dto';

type StreamEvent =
  | { type: 'delta'; content: string }
  | { type: 'done' }
  | { type: 'error'; message: string };

@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  @Post('stream')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async stream(
    @Body() dto: StreamChatDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    if (dto.messages[dto.messages.length - 1]?.role !== 'user') {
      throw new BadRequestException(
        'Последнее сообщение должно быть от пользователя.',
      );
    }

    this.chatService.assertRateLimit(
      request.ip || request.socket.remoteAddress || 'unknown',
    );

    response.status(200);
    response.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache, no-transform');
    response.setHeader('Connection', 'keep-alive');
    response.setHeader('X-Accel-Buffering', 'no');
    response.flushHeaders();

    const abortController = new AbortController();
    let finished = false;

    const writeEvent = (event: StreamEvent) => {
      if (!response.writableEnded) {
        response.write(`data: ${JSON.stringify(event)}\n\n`);
      }
    };

    const heartbeat = setInterval(() => {
      if (!response.writableEnded) response.write(': ping\n\n');
    }, 15_000);

    response.on('close', () => {
      if (!finished) abortController.abort();
    });

    try {
      await this.chatService.streamResponse(
        dto.messages,
        (content) => writeEvent({ type: 'delta', content }),
        abortController.signal,
      );

      if (!abortController.signal.aborted) writeEvent({ type: 'done' });
    } catch (error) {
      if (!abortController.signal.aborted) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(`Mistral stream failed: ${message}`);
        writeEvent({
          type: 'error',
          message: 'Не удалось получить ответ. Попробуйте ещё раз.',
        });
      }
    } finally {
      finished = true;
      clearInterval(heartbeat);
      if (!response.writableEnded) response.end();
    }
  }
}
