import type { ChatMessage } from '@/entities/chat'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
const maxEventBufferLength = 256 * 1024
const maxContextMessages = 20

interface StreamEvent {
	type: 'delta' | 'done' | 'error'
	content?: string
	message?: string
}

interface StreamChatResponseOptions {
	messages: ChatMessage[]
	onDelta: (content: string) => void
	signal?: AbortSignal
}

const parseStreamEvent = (block: string): StreamEvent | null => {
	const data = block
		.split('\n')
		.find(line => line.startsWith('data: '))
		?.slice(6)

	if (!data) return null

	const event: unknown = JSON.parse(data)
	if (!event || typeof event !== 'object' || !('type' in event)) return null

	const typedEvent = event as Partial<StreamEvent>
	if (!['delta', 'done', 'error'].includes(typedEvent.type ?? '')) return null

	return typedEvent as StreamEvent
}

export async function streamChatResponse({
	messages,
	onDelta,
	signal,
}: StreamChatResponseOptions): Promise<string> {
	const response = await fetch(`${serverUrl}/api/chat/stream`, {
		method: 'POST',
		headers: {
			Accept: 'text/event-stream',
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
		},
		credentials: 'include',
		body: JSON.stringify({ messages: messages.slice(-maxContextMessages) }),
		signal,
	})

	if (!response.ok) {
		throw new Error(`Chat request failed with status ${response.status}`)
	}
	if (!response.body) throw new Error('Chat response stream is unavailable')

	const reader = response.body.getReader()
	const decoder = new TextDecoder()
	let buffer = ''
	let assistantContent = ''

	try {
		while (true) {
			const { value, done } = await reader.read()
			buffer += decoder.decode(value, { stream: !done })

			if (buffer.length > maxEventBufferLength) {
				throw new Error('Chat response event exceeded the allowed size')
			}

			let boundary = buffer.indexOf('\n\n')
			while (boundary !== -1) {
				const event = parseStreamEvent(buffer.slice(0, boundary))
				buffer = buffer.slice(boundary + 2)

				if (event?.type === 'delta' && typeof event.content === 'string') {
					assistantContent += event.content
					onDelta(assistantContent)
				}
				if (event?.type === 'error') {
					throw new Error('Upstream chat generation failed')
				}

				boundary = buffer.indexOf('\n\n')
			}

			if (done) break
		}
	} finally {
		reader.releaseLock()
	}

	return assistantContent
}
