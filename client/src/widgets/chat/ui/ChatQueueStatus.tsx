import { ListOrdered, Sparkles } from 'lucide-react'
import TypingLoader from '@/shared/ui/TypingLoader'

interface ChatQueueStatusProps {
	isLoading: boolean
	queuedCount: number
}

export function ChatQueueStatus({
	isLoading,
	queuedCount,
}: ChatQueueStatusProps) {
	if (!isLoading && queuedCount === 0) return null

	return (
		<div
			className='flex items-center gap-2 text-xs text-white/70'
			role='status'
			aria-live='polite'>
			{isLoading ? (
				<div className='flex items-center gap-2 rounded-full border border-gray1 bg-black3/95 px-3 py-1 shadow-md shadow-black1/40 backdrop-blur-sm'>
					<Sparkles className='size-3.5 text-gray2' aria-hidden='true' />
					<span>ИИ отвечает</span>
					<TypingLoader />
				</div>
			) : null}

			{queuedCount > 0 ? (
				<div className='flex items-center gap-2 rounded-full border border-gray2/50 bg-black4/95 px-2.5 py-1 shadow-md shadow-black1/40 backdrop-blur-sm'>
					<ListOrdered className='size-3.5 text-gray2' aria-hidden='true' />
					<span>В очереди</span>
					<span className='flex min-w-5 items-center justify-center rounded-full bg-gray2 px-1.5 py-0.5 font-semibold text-black1'>
						{queuedCount}
					</span>
				</div>
			) : null}
		</div>
	)
}
