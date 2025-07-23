'use client'

import { useEffect, useRef, useState } from 'react'
import './ChatHistory.css'
import { Copy, Check, Trash2Icon } from 'lucide-react'
import { clearHistory } from '@/store/chat/chat.slice'
import { useDispatch } from 'react-redux'
import ChatHistoryHeader from './ChatHistoryHeader'
import { ChatMessage } from '@/types'
import ChatMessageContent from './ChatMessageContent'
import { copyToClipboard } from '@/utils/copyToClipboard'
import Header from '../layout/Header'

interface ChatHistoryProps {
	history: ChatMessage[]
}

const ChatHistory = ({ history }: ChatHistoryProps) => {
	const dispatch = useDispatch()
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null)
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

	useEffect(() => {
		if (endOfMessagesRef.current) {
			endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [history])

	const handleCopy = async (text: string, index: number) => {
		await copyToClipboard(text)
		setCopiedIndex(index)
		setTimeout(() => {
			setCopiedIndex(null)
		}, 2000)
	}

	return (
		<div className='bg-inherit flex flex-col max-sm:mb-4 w-full h-full mt-2 max-h-[85vh] rounded-lg overflow-y-auto max-w-[900px] sm:mx-[10%] self-center text-sm'>
			<Header />         
			<ChatHistoryHeader />
			<div className='relative flex-1 mt-2 space-y-3 mb-2 mr-auto'>
				{history.map((msg, index) => (
					<div
						key={index}
						className={`p-2 rounded-lg w-fit max-w-[900px] mr-auto ${
							msg.role === 'user' ? 'bg-black5' : 'ml-5 bg-black4'
						} text-white relative`}
						style={{
							overflowWrap: 'break-word',
							wordWrap: 'break-word',
							wordBreak: 'break-word',
						}}>
						<strong className='text-sm text-white/50'>
							{msg.role === 'user' ? 'Вы' : 'AI Ассистент'}:
						</strong>
						{msg.role === 'assistant' && (
							<button
								onClick={() => handleCopy(msg.content, index)}
								className='absolute top-2 right-2 text-gray-400 hover:text-gray-200'
								aria-label='Скопировать сообщение'>
								{copiedIndex === index ? (
									<Check className='h-5 w-auto text-green-600' />
								) : (
									<Copy className='h-5 w-auto text-gray1 hover:text-white/70' />
								)}
							</button>
						)}
						<ChatMessageContent content={msg.content} />
					</div>
				))}
				<div ref={endOfMessagesRef} />
				{history.length > 1 ? (
					<div
						onClick={() => dispatch(clearHistory())}
						className='absolute -bottom-2 right-2 flex text-[10px] items-center gap-2 duration-200 text-neutral-700 cursor-pointer hover:text-neutral-400'>
						Очистить историю
						<Trash2Icon className='h-4 w-auto ' />
					</div>
				) : null}
			</div>
		</div>
	)
}

export default ChatHistory
