'use client'

import { useChat, useSidebar } from '@/hooks/useSelectors'
import React, { useEffect } from 'react'
import SidebarToggleBtn from './SidebarToggleBtn'
import NeonLogo from './NeonLogo'
import SidebarMistralText from './SidebarMistralText'
import SidebarHistory from './SidebarHistory'
import SidebarUserInfo from './SidebarUserInfo'
import SidebarContactText from './SidebarContactText'

const Sidebar = () => {
	const { isOpen } = useSidebar()
	const { history } = useChat()
	const firstQuestion = history[0]?.content

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<aside
			className={`relative border-black3 max-sm:text-[12px] border-r-2 bg-black1 min-h-screen flex flex-col justify-between transition-all duration-300 ${
				isOpen ? 'w-64' : 'w-0'
			}`}>
			<SidebarToggleBtn isOpen={isOpen} />
			<div
				className={`flex flex-col justify-between transition-all duration-300 ${
					isOpen ? 'opacity-100' : 'hidden opacity-0'
				}`}>
				<NeonLogo isOpen={isOpen} />
				<SidebarContactText isOpen={isOpen} />
				<SidebarMistralText isOpen={isOpen} />
				<SidebarHistory isOpen={isOpen} firstQuestion={firstQuestion} />
			</div>
			<SidebarUserInfo isOpen={isOpen} />
		</aside>
	)
}

export default Sidebar
