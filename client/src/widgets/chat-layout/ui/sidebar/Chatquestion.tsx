'use client'

import { DotIcon, Trash2Icon } from 'lucide-react'

interface Props {
	question?: string
	onClear: () => void
}

const Chatquestion = ({ question, onClear }: Props) => {
	const editedQuestion = `${String(question).slice(0, 15)}...`

	return question ? (
		<div className='flex items-center justify-between text-sm text-neutral-400'>
			<div className='flex items-center'>
				<DotIcon />
				{editedQuestion}
			</div>
			<button
				type='button'
				onClick={() => {
					onClear()
					window.scrollTo(0, 0)
				}}
				className='text-neutral-700 hover:text-neutral-400'
				aria-label='Очистить историю'>
				<Trash2Icon className='h-4 w-auto' />
			</button>
		</div>
	) : (
		<div className='ml-1 text-xs text-gray1'>История пуста...</div>
	)
}

export default Chatquestion
