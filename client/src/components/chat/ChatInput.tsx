'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import TypingLoader from '../base/TypingLoader'
import Loader from '../base/Loader'
import { Textarea } from '../ui/textarea'
import useDeviceType from '@/hooks/useDeviceType'

interface ChatInputProps {
	isLoading: boolean
	onMessageSend: (message: string) => void
}

const ChatInput = ({ isLoading, onMessageSend }: ChatInputProps) => {
	const deviseType = useDeviceType()
	const [question, setQuestion] = useState('')
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (question.trim() === '') return; // Проверка на пустое сообщение
		onMessageSend(question)
		setQuestion('')
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setQuestion(e.target.value)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') { // Отправку по Enter
			handleSubmit(e)
		}
	}

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto' // Сбрасываем высоту
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Устанавливаем новую высоту
		}
	}, [question])

	return (
		<div className={`relative ${deviseType === 'mobile' ? 'mx-0' : 'mx-[20%]'}`}>
			<div className='absolute left-0 -top-6'>{isLoading ? <TypingLoader /> : ''}</div>
			<form onSubmit={handleSubmit} className={` items-center mb-4 ${deviseType === 'mobile' ? 'flex flex-col gap-1' : 'flex'}`}>
				<Textarea
					ref={textareaRef}
					value={question}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown} // Добавляем обработчик клавиш
					placeholder='Введите ваш вопрос'
					required
					className='flex-grow mr-2 resize-none overflow-hidden placeholder:text-[12px]'
					style={{ minHeight: '40px' }} // Минимальная высота
				/>
				<Button disabled={isLoading} type='submit'>
					{isLoading ? <Loader /> : 'Отправить'}
				</Button>
			</form>
		</div>
	)
}

export default ChatInput
