'use client'

import { useChat, useSidebar, useUser } from '@/hooks/useSelectors'
import { UserCircle2Icon } from 'lucide-react'
import React from 'react'
import Chatquestion from '../chat/Chatquestion'
import SidebarToggleBtn from './SidebarToggleBtn'
import NeonLogo from './NeonLogo'

const Sidebar = () => {
	const { isOpen } = useSidebar()
	const { user } = useUser() || { user: { name: 'Гость' } }
	const { history } = useChat()
	const firstQuestion = history[0]?.content

	return (
		<aside
			className={`relative border-black3 max-sm:text-[12px] border-r-2 bg-black1 min-h-screen flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}>
			<SidebarToggleBtn isOpen={isOpen} />
			<div
				className={`flex flex-col justify-between transition-all duration-300 ${isOpen ? 'opacity-100' : 'hidden opacity-0'}`}>
				<NeonLogo isOpen={isOpen} />
				<div
					className={`mb-5 transition-transform duration-300 ${
						isOpen
							? 'transform translate-x-0 opacity-100 px-5'
							: '-translate-x-full opacity-0'
					}`}>
					<div className='flex items-center text-white/70 gap-3 mb-2'>
						Нейросеть Mistral AI
					</div>
					<div className='text-[12px] text-gray1'>
						Используйте нейросеть{' '}
						<span className='text-white/30 font-bold'>Mistral AI</span> для
						генерации текста, понимания языка и других задач
					</div>
				</div>

				<div
					className={`text-white/70 text-[12px] transition-transform duration-300 ${
						isOpen
							? 'transform translate-x-0 opacity-100 px-5'
							: '-translate-x-full opacity-0'
					}`}>
					История запросов
				</div>

				{firstQuestion && (
					<div className='px-5 transition-transform duration-300'>
						<Chatquestion question={firstQuestion} />
					</div>
				)}
			</div>

			<div
				className={`flex justify-start mb-5 items-center gap-3 px-5 transition-transform duration-300 ${
					isOpen
						? 'transform translate-x-0 opacity-100'
						: '-translate-x-full opacity-0 hidden'
				}`}>
				<UserCircle2Icon className='text-gray1 cursor-pointer hover:text-white/70 duration-200' />
				{user ? (
					<span className='text-white/70 text-sm font-bold'>{user?.name}</span>
				) : (
					<span className='text-white/70 text-sm font-bold'>Гость</span>
				)}
			</div>
		</aside>
	)
}

export default Sidebar
