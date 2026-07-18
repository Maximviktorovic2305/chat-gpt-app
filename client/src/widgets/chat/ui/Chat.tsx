'use client'

import { useChatQueue } from '@/features/chat'
import ChatHistory from './ChatHistory'
import ChatInput from './ChatInput'
import ChatOpportunities from './ChatOpportunities'

const Chat = () => {
	const { history, isLoading, queuedCount, enqueueMessage, clearHistory } =
		useChatQueue()

	return (
		<div className='px-4 flex flex-col justify-between size-full h-full'>
			<ChatHistory
				history={history}
				isLoading={isLoading}
				onClear={clearHistory}
			/>
			<div className='h-full max-h-fit'>
				{!history.length && <ChatOpportunities />}
				<ChatInput
					isLoading={isLoading}
					queuedCount={queuedCount}
					onMessageSend={enqueueMessage}
				/>
			</div>
		</div>
	)
}

export default Chat
