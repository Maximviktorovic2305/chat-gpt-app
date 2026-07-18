'use client'

import {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
	type PropsWithChildren,
} from 'react'
import type { ChatMessage } from '@/entities/chat'
import { streamChatResponse } from '../api/get-chat-stream'

interface ChatQueueContextValue {
	history: ChatMessage[]
	isLoading: boolean
	queuedCount: number
	enqueueMessage: (question: string) => void
	clearHistory: () => void
}

const ChatQueueContext = createContext<ChatQueueContextValue | null>(null)
const emptyResponse = 'Ответ не получен. Попробуйте ещё раз.'
const failedResponse = 'Не удалось получить ответ. Попробуйте ещё раз.'

export function ChatProvider({ children }: PropsWithChildren) {
	const [history, setHistory] = useState<ChatMessage[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [queuedCount, setQueuedCount] = useState(0)
	const queueRef = useRef<string[]>([])
	const transcriptRef = useRef<ChatMessage[]>([])
	const processingRef = useRef(false)
	const generationRef = useRef(0)
	const abortControllerRef = useRef<AbortController | null>(null)

	const updateLastAssistantMessage = useCallback((content: string) => {
		setHistory(currentHistory => {
			const nextHistory = [...currentHistory]
			for (let index = nextHistory.length - 1; index >= 0; index -= 1) {
				if (nextHistory[index].role === 'assistant') {
					nextHistory[index] = { role: 'assistant', content }
					break
				}
			}
			return nextHistory
		})
	}, [])

	const processQueue = useCallback(async () => {
		if (processingRef.current) return

		processingRef.current = true
		setIsLoading(true)
		const generation = generationRef.current

		try {
			while (
				queueRef.current.length > 0 &&
				generation === generationRef.current
			) {
				const question = queueRef.current.shift()
				setQueuedCount(queueRef.current.length)
				if (!question) continue

				const userMessage: ChatMessage = { role: 'user', content: question }
				const requestHistory = [...transcriptRef.current, userMessage]
				transcriptRef.current = requestHistory
				setHistory(current => [
					...current,
					userMessage,
					{ role: 'assistant', content: '' },
				])

				const abortController = new AbortController()
				abortControllerRef.current = abortController
				let assistantContent = ''

				try {
					assistantContent = await streamChatResponse({
						messages: requestHistory,
						onDelta: updateLastAssistantMessage,
						signal: abortController.signal,
					})
					if (!assistantContent) assistantContent = emptyResponse
				} catch {
					if (abortController.signal.aborted) break
					assistantContent = failedResponse
				} finally {
					abortControllerRef.current = null
				}

				if (generation !== generationRef.current) break
				updateLastAssistantMessage(assistantContent)
				transcriptRef.current = [
					...transcriptRef.current,
					{ role: 'assistant', content: assistantContent },
				]
			}
		} finally {
			processingRef.current = false
			setIsLoading(false)
			if (queueRef.current.length > 0) void processQueue()
		}
	}, [updateLastAssistantMessage])

	const enqueueMessage = useCallback(
		(question: string) => {
			const normalizedQuestion = question.trim()
			if (!normalizedQuestion) return

			queueRef.current.push(normalizedQuestion)
			setQueuedCount(queueRef.current.length)
			void processQueue()
		},
		[processQueue],
	)

	const clearHistory = useCallback(() => {
		generationRef.current += 1
		queueRef.current = []
		transcriptRef.current = []
		setQueuedCount(0)
		setHistory([])
		abortControllerRef.current?.abort()
		abortControllerRef.current = null
	}, [])

	return (
		<ChatQueueContext.Provider
			value={{
				history,
				isLoading,
				queuedCount,
				enqueueMessage,
				clearHistory,
			}}>
			{children}
		</ChatQueueContext.Provider>
	)
}

export function useChatQueue() {
	const context = useContext(ChatQueueContext)
	if (!context) throw new Error('useChatQueue must be used within ChatProvider')
	return context
}
