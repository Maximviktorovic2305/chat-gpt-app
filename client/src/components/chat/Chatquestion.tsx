import { clearHistory } from '@/store/chat/chat.slice'
import { DotIcon, Trash2Icon } from 'lucide-react'
import { useDispatch } from 'react-redux'

interface Props {
	question: string
}

const Chatquestion = ({ question }: Props) => {
	const dispatch = useDispatch()
	const editedQuestion = String(question).slice(0, 15) + '...'
	return (
		<div className='text-[14px] text-neutral-400 flex items-center justify-between'>
			<span className='flex items-center'>
				<DotIcon />
				{editedQuestion}
			</span>
			<Trash2Icon
				onClick={() => dispatch(clearHistory())}
				className='h-4 w-auto text-neutral-700 cursor-pointer hover:text-neutral-400'
			/>
		</div>
	)
}

export default Chatquestion