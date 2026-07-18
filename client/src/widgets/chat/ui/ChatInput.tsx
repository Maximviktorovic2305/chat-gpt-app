'use client'

import { useState, useRef } from 'react'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { useDeviceType } from '@/shared/model'
import { ChatQueueStatus } from './ChatQueueStatus'

interface ChatInputProps {
    isLoading: boolean
	queuedCount: number
    onMessageSend: (message: string) => void
}

const ChatInput = ({ isLoading, queuedCount, onMessageSend }: ChatInputProps) => {
    const deviseType = useDeviceType()
    const [question, setQuestion] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (question.trim() === '') return
        onMessageSend(question)
        setQuestion('')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
			e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div className={`relative  ${deviseType === 'mobile' ? 'mx-0' : 'mx-[20%]'}`}>
			<div className='absolute left-0 -top-9'>
				<ChatQueueStatus isLoading={isLoading} queuedCount={queuedCount} />
			</div>
            <form onSubmit={handleSubmit} className={`items-center mb-4 ${deviseType === 'mobile' ? 'flex flex-col gap-1' : 'flex gap-2'}`}>
                <Textarea
                    ref={textareaRef}
                    value={question}
                    onChange={handleInputChange}
					maxLength={4000}
                    onKeyDown={handleKeyDown} // Добавляем обработчик клавиш
                    placeholder='Введите ваш вопрос'
                    className=' min-h-10 placeholder:text-[12px] '
                />
				<Button type='submit' className='bg-black4'>
					{isLoading ? 'В очередь' : 'Отправить'}
                </Button>
            </form>
        </div>
    )
}

export default ChatInput
