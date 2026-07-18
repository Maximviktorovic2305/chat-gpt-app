import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Mistral } from '@mistralai/mistralai'
import { ChatMessageDto } from './dto/stream-chat.dto'

@Injectable()
export class ChatService {
	private readonly client: Mistral
	private readonly model: string
	private readonly activeClients = new Set<string>()

	constructor(config: ConfigService) {
		this.client = new Mistral({
			apiKey: config.getOrThrow<string>('MISTRAL_API_KEY'),
		})
		this.model = config.get<string>('MISTRAL_MODEL') ?? 'mistral-small-latest'
	}

	beginStream(clientId: string): void {
		if (this.activeClients.has(clientId)) {
			throw new HttpException(
				'Дождитесь завершения предыдущего ответа',
				HttpStatus.TOO_MANY_REQUESTS,
			)
		}
		this.activeClients.add(clientId)
	}

	endStream(clientId: string): void {
		this.activeClients.delete(clientId)
	}

	async streamResponse(
		messages: ChatMessageDto[],
		onDelta: (content: string) => void,
		signal: AbortSignal,
	): Promise<void> {
		const stream = await this.client.chat.stream(
			{
				model: this.model,
				messages: messages.map(({ role, content }) => ({ role, content })),
				maxTokens: 1200,
				temperature: 0.4,
			},
			{ signal, timeoutMs: 120_000 },
		)

		for await (const event of stream) {
			const content = event.data?.choices[0]?.delta.content

			if (typeof content === 'string') {
				if (content) onDelta(content)
				continue
			}
			if (Array.isArray(content)) {
				for (const chunk of content) {
					if (chunk.type === 'text' && 'text' in chunk && chunk.text) {
						onDelta(chunk.text)
					}
				}
			}
		}
	}
}
