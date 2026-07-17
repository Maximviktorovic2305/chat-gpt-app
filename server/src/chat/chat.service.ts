import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mistral } from '@mistralai/mistralai';
import { ChatMessageDto } from './dto/stream-chat.dto';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_REQUESTS = 10;

@Injectable()
export class ChatService {
  private readonly client: Mistral;
  private readonly model: string;
  private readonly requestLog = new Map<string, number[]>();

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('MISTRAL_API_KEY');

    if (!apiKey) {
      throw new Error('MISTRAL_API_KEY is required');
    }

    this.client = new Mistral({ apiKey });
    this.model =
      this.configService.get<string>('MISTRAL_MODEL') || 'mistral-small-latest';
  }

  assertRateLimit(clientId: string) {
    const now = Date.now();
    const recentRequests = (this.requestLog.get(clientId) || []).filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    );

    if (recentRequests.length >= RATE_LIMIT_REQUESTS) {
      throw new HttpException(
        'Слишком много запросов. Попробуйте через минуту.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    recentRequests.push(now);
    this.requestLog.set(clientId, recentRequests);

    if (this.requestLog.size > 1000) {
      for (const [key, timestamps] of this.requestLog) {
        if (
          timestamps.every(
            (timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS,
          )
        ) {
          this.requestLog.delete(key);
        }
      }
    }
  }

  async streamResponse(
    messages: ChatMessageDto[],
    onDelta: (content: string) => void,
    signal: AbortSignal,
  ) {
    const stream = await this.client.chat.stream(
      {
        model: this.model,
        messages: messages.map(({ role, content }) => ({ role, content })),
        maxTokens: 1200,
        temperature: 0.4,
      },
      {
        signal,
        timeoutMs: 120_000,
      },
    );

    for await (const event of stream) {
      const content = event.data?.choices[0]?.delta.content;

      if (typeof content === 'string') {
        if (content) onDelta(content);
        continue;
      }

      if (Array.isArray(content)) {
        for (const chunk of content) {
          if (chunk.type === 'text' && 'text' in chunk && chunk.text) {
            onDelta(chunk.text);
          }
        }
      }
    }
  }
}
