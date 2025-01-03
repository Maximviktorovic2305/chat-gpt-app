import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import TypingLoader from '../base/TypingLoader'
import Loader from '../base/Loader'
import { Textarea } from '../ui/textarea'

interface ChatInputProps {
	isLoading: boolean
	onMessageSend: (message: string) => void
}

const ChatInput = ({ isLoading, onMessageSend }: ChatInputProps) => {
	const [question, setQuestion] = useState('')
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onMessageSend(question)
		setQuestion('')
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setQuestion(e.target.value)
	}

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto' // Сбрасываем высоту
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Устанавливаем новую высоту
		}
	}, [question])

	return (
		<div className='mx-[20%] relative'>
			<div className='absolute left-0 -top-6'>{isLoading ? <TypingLoader /> : ''}</div>
			<form onSubmit={handleSubmit} className='flex items-center mb-4'>
				<Textarea
					ref={textareaRef}
					value={question}
					onChange={handleInputChange}
					placeholder='Введите ваш вопрос'
					required
					className='flex-grow mr-2 resize-none overflow-hidden placeholder:text-[12px]' // 'resize-none' для предотвращения изменения размера пользователем
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
