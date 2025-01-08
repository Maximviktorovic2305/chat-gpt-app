/* eslint-disable @typescript-eslint/ban-ts-comment */
import { addMessage, setLoading } from '@/store/chat/chat.slice'
import { ChatMessage } from '@/types'
import { Mistral } from '@mistralai/mistralai'
import { Dispatch } from 'react'

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY || ''
const client = new Mistral({ apiKey })

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
	try {
		dispatch(setLoading(true)) // Устанавливаем состояние загрузки

		const chatResponse = await client.chat.complete({
			model: 'mistral-large-latest',
			messages: updatedHistory,
		})

		const aiMessage: ChatMessage = {
			role: 'assistant',
			// @ts-ignore
			content: chatResponse.choices[0]?.message?.content || 'Неизвестный ответ',
		}

		dispatch(addMessage(aiMessage)) // Добавляем ответ от AI в историю
	} catch (error) {
		console.error('Ошибка при обращении к Mistral API:', error)
	} finally {
		dispatch(setLoading(false)) // Сбрасываем состояние загрузки
	}
}
