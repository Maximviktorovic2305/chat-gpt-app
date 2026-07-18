'use client'

import { StepBack, StepForward } from 'lucide-react'
import './SidebarToggleBtn.css'

interface Props {
	isOpen: boolean
	onToggle: () => void
}

const SidebarToggleBtn = ({ isOpen, onToggle }: Props) => (
	<button
		type='button'
		onClick={() => {
			onToggle()
			window.scrollTo(0, 0)
		}}
		className={`absolute top-8 ${
			isOpen ? 'right-[-11px]' : 'right-[-30px]'
		} z-[9999] flex size-8 items-center justify-center rounded-full border-gray1 transition-transform duration-300`}
		aria-label={isOpen ? 'Закрыть боковую панель' : 'Открыть боковую панель'}>
		<div className='icon-container'>
			{isOpen ? (
				<StepBack className='icon' size={24} />
			) : (
				<StepForward className='icon' size={24} />
			)}
		</div>
	</button>
)

export default SidebarToggleBtn
