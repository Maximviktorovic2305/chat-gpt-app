'use client'

import { useEffect } from 'react'
import { useChatQueue } from '@/features/chat'
import NeonLogo from './NeonLogo'
import SidebarContactText from './SidebarContactText'
import SidebarHistory from './SidebarHistory'
import SidebarMistralText from './SidebarMistralText'
import SidebarToggleBtn from './SidebarToggleBtn'
import SidebarUserInfo from './SidebarUserInfo'

interface SidebarProps {
	isOpen: boolean
	onToggle: () => void
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
	const { history, clearHistory } = useChatQueue()
	const firstQuestion = history.find(message => message.role === 'user')?.content

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<aside
			className={`relative border-black3 max-sm:text-xs border-r-2 bg-black1 min-h-screen flex flex-col justify-between transition-all duration-300 ${
				isOpen ? 'w-64' : 'w-0'
			}`}>
			<SidebarToggleBtn isOpen={isOpen} onToggle={onToggle} />
			<div
				className={`flex flex-col justify-between transition-all duration-300 ${
					isOpen ? 'opacity-100' : 'hidden opacity-0'
				}`}>
				<NeonLogo isOpen={isOpen} />
				<SidebarContactText isOpen={isOpen} />
				<SidebarMistralText isOpen={isOpen} />
				<SidebarHistory
					isOpen={isOpen}
					firstQuestion={firstQuestion}
					onClear={clearHistory}
				/>
			</div>
			<SidebarUserInfo isOpen={isOpen} />
		</aside>
	)
}

export default Sidebar
