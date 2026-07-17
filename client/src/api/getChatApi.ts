/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	addMessage,
	setLoading,
	updateLastAssistantMessage,
} from '@/store/chat/chat.slice'
import { ChatMessage } from '@/types'
import { Dispatch } from 'react'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''

interface StreamEvent {
	type: 'delta' | 'done' | 'error'
	content?: string
	message?: string
}

interface GetPixtralApiProps {
	updatedHistory: ChatMessage[]
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dispatch: Dispatch<any>
}

export const getChatApi = async ({
	updatedHistory,
	dispatch,
}: GetPixtralApiProps): Promise<void> => {
	let assistantContent = ''

	try {
		dispatch(setLoading(true))
		dispatch(addMessage({ role: 'assistant', content: '' }))

		const response = await fetch(`${serverUrl}/api/chat/stream`, {
			method: 'POST',
			headers: {
				Accept: 'text/event-stream',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ messages: updatedHistory }),
		})

		if (!response.ok) {
			const errorBody = await response.json().catch(() => null)
			throw new Error(errorBody?.message || `Ошибка сервера: ${response.status}`)
		}

		if (!response.body) throw new Error('Поток ответа недоступен')

		const reader = response.body.getReader()
		const decoder = new TextDecoder()
		let buffer = ''

		const processEvent = (block: string) => {
			const data = block
				.split('\n')
				.find((line) => line.startsWith('data: '))
				?.slice(6)

			if (!data) return

			const event = JSON.parse(data) as StreamEvent

			if (event.type === 'delta' && event.content) {
				assistantContent += event.content
				dispatch(updateLastAssistantMessage(assistantContent))
			}

			if (event.type === 'error') {
				throw new Error(event.message || 'Ошибка генерации ответа')
			}
		}

		while (true) {
			const { value, done } = await reader.read()
			buffer += decoder.decode(value, { stream: !done })

			let boundary = buffer.indexOf('\n\n')
			while (boundary !== -1) {
				processEvent(buffer.slice(0, boundary))
				buffer = buffer.slice(boundary + 2)
				boundary = buffer.indexOf('\n\n')
			}

			if (done) break
		}

		if (!assistantContent) {
			dispatch(updateLastAssistantMessage('Ответ не получен. Попробуйте ещё раз.'))
		}
	} catch (error) {
		console.error('Ошибка при обращении к Mistral API:', error)
		const errorMessage =
			error instanceof Error
				? error.message
				: 'Не удалось получить ответ. Попробуйте ещё раз.'

		dispatch(
			updateLastAssistantMessage(
				assistantContent
					? `${assistantContent}\n\nОтвет был прерван: ${errorMessage}`
					: errorMessage,
			),
		)
	} finally {
		dispatch(setLoading(false))
	}
}
