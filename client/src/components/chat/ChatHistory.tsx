'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from '@/types'
import './ChatHistory.css'
import { Copy, Check, CircleHelp } from 'lucide-react' // Импортируем иконки Copy и Check
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

interface ChatHistoryProps {
	history: ChatMessage[]
}

const ChatHistory = ({ history }: ChatHistoryProps) => {
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null) // Создаём реф для конца сообщений
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null) // Хранит индекс скопированного сообщения

	useEffect(() => {
		// Прокручиваем вниз, когда 'history' обновляется
		if (endOfMessagesRef.current) {
			endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [history])

	const copyToClipboard = (text: string, index: number) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopiedIndex(index)
				setTimeout(() => {
					setCopiedIndex(null)
				}, 2000)
			})
			.catch(err => {
				console.error('Ошибка при копировании: ', err)
			})
	}

	return (
		<div className='bg-inherit px-4 pt-4 rounded-lg max-h-screen overflow-y-auto max-w-[900px] mr-auto text-sm'>
			<div className='flex mb-3 items-center gap-1'>
				<h2 className='font-bold text-sm text-gray1'>История переписки:</h2>
				<HoverCard>
					<HoverCardTrigger asChild>
						<CircleHelp className='w-4 h-auto cursor-pointer text-gray1 hover:text-white duration-200' />
					</HoverCardTrigger>
					<HoverCardContent className='w-full max-w-[200px]'>
						<div className='text-[12px] text-white/30 mb-1'>
							История переписки
						</div>
						Нейросеть использует историю чата в качестве оперативной памяти для
						генерации следующих ответов.
					</HoverCardContent>
				</HoverCard>
			</div>
			<div className='space-y-4'>
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
						}} // Стили для переноса слов
					>
						<strong className='text-sm text-white/50'>
							{msg.role === 'user' ? 'Вы' : 'AI Ассистент'}:
						</strong>
						{msg.role === 'assistant' && (
							<button
								onClick={() => copyToClipboard(msg.content, index)}
								className='absolute top-2 right-2 text-gray-400 hover:text-gray-200'
								aria-label='Скопировать сообщение'>
								{copiedIndex === index ? (
									<Check className='h-5 w-auto text-green-600' />
								) : (
									<Copy className='h-5 w-auto text-white/50 hover:text-white/70' />
								)}
							</button>
						)}
						<p className='mt-1'>
							{msg.content} {/* Отображаем полное содержимое без разбиения */}
						</p>
					</div>
				))}
				{/* Элемент реф для прокрутки */}
				<div ref={endOfMessagesRef} />
			</div>
		</div>
	)
}

export default ChatHistory
