'use client'

import { useDispatch } from 'react-redux'
import { ChatMessage } from '@/types'
import { getChatApi } from '@/api/getChatApi'
import { useChat } from '@/hooks/useSelectors'
import { addMessage } from '@/store/chat/chat.slice'
import ChatHistory from './ChatHistory'
import ChatInput from './ChatInput'
import ChatOpportunities from './ChatOpportunities'

const Chat = () => {
	const dispatch = useDispatch()
	const { history, isLoading } = useChat()

	const handleMessageSend = async (question: string) => {
		const userMessage: ChatMessage = { role: 'user', content: question }
		dispatch(addMessage(userMessage)) // Добавляем пользовательское сообщение в историю

		await getChatApi({ updatedHistory: [...history, userMessage], dispatch })
	}

	return (
		<div className='px-4 flex flex-col justify-between size-full h-full'>
			<ChatHistory history={history} />
			<div className='h-full max-h-fit'>
				{!history.length && <ChatOpportunities />}
				<ChatInput isLoading={isLoading} onMessageSend={handleMessageSend} />
			</div>
		</div>
	)
}

export default Chat
