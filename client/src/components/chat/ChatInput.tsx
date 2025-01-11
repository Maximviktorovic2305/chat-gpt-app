'use client'

import { useState, useRef } from 'react'
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

    return (
        <div className={`relative  ${deviseType === 'mobile' ? 'mx-0' : 'mx-[20%]'}`}>
            <div className='absolute left-0 -top-6'>{isLoading ? <TypingLoader /> : ''}</div>
            <form onSubmit={handleSubmit} className={`items-center mb-4 ${deviseType === 'mobile' ? 'flex flex-col gap-1' : 'flex gap-2'}`}>
                <Textarea
                    ref={textareaRef}
                    value={question}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Добавляем обработчик клавиш
                    placeholder='Введите ваш вопрос'
                    className=' min-h-10 placeholder:text-[12px] '
                />
                <Button disabled={isLoading} type='submit' className='bg-black4'>
                    {isLoading ? <Loader /> : 'Отправить'}
                </Button>
            </form>
        </div>
    )
}

export default ChatInput
