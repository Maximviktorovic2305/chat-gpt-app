import Chatquestion from './Chatquestion'

interface Props {
	isOpen: boolean
	firstQuestion?: string
	onClear: () => void
}

const SidebarHistory = ({ isOpen, firstQuestion, onClear }: Props) => {
	return (
		<>
			<div
				className={`text-white/70 text-[12px] transition-transform duration-300 ${
					isOpen
						? 'transform translate-x-0 opacity-100 px-5'
						: '-translate-x-full opacity-0'
				}`}>
				История запросов
			</div>
			<div className='px-5 transition-transform duration-300'>
				<Chatquestion question={firstQuestion} onClear={onClear} />
			</div>
		</>
	)
}

export default SidebarHistory
