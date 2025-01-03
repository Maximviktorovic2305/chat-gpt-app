'use client'

import { useDispatch } from 'react-redux'
import { ChatMessage } from '@/types'
import { getChatApi } from '@/api/getChatApi'
import { useChat } from '@/hooks/useSelectors'
import { addMessage } from '@/store/chat/chat.slice'
import ChatHistory from './ChatHistory'
import ChatInput from './ChatInput'

const Chat: React.FC = () => {
	const dispatch = useDispatch()
	const { history, isLoading } = useChat()

	const handleMessageSend = async (question: string) => {
		const userMessage: ChatMessage = { role: 'user', content: question }
		dispatch(addMessage(userMessage)) // Добавляем пользовательское сообщение в историю

		await getChatApi({ updatedHistory: [...history, userMessage], dispatch })
	}

	return (
		<div className='p-4 flex flex-col justify-between w-full gap-7 h-full min-h-screen overflow-y-auto'>
			<ChatHistory history={history} />
			<ChatInput isLoading={isLoading} onMessageSend={handleMessageSend} />
		</div>
	)
}

export default Chat
