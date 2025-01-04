/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { useChat, useSidebar, useUser } from '@/hooks/useSelectors'
import { UserCircle2Icon, StepBack, StepForward } from 'lucide-react'
import React from 'react'
import Chatquestion from '../chat/Chatquestion'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '@/store/sidebar/sidebar.slice'

const Sidebar = () => {
	const { isOpen } = useSidebar()
	const dispatch = useDispatch()
	const { user } = useUser() || { user: { name: 'Гость' } }
	const { history } = useChat()
	const firstQuestion = history[0]?.content

	return (
		<aside
			className={`relative bg-black1 ${
				isOpen ? 'border-r-2' : 'border-none'
			} border-black3 min-h-screen flex flex-col justify-between transition-all duration-300 ${
				isOpen ? 'w-64' : 'w-0'
			}`}>
			{/* Кнопка для скрытия/открытия Sidebar */}
			<button
				onClick={() => dispatch(toggleSidebar())}
				className={`absolute top-8 ${
					isOpen ? 'right-[-11px]' : 'right-[-30px]'
				} w-8 h-8   border-gray1 rounded-full flex justify-center items-center transform transition-transform duration-300`}
				aria-label={
					isOpen ? 'Скрыть боковую панель' : 'Показать боковую панель'
				}>
				{isOpen ? (
					<StepBack className='text-gray1 hover:text-white/80 duration-200' />
				) : (
					<StepForward className='text-gray1 hover:text-white/80 duration-200' />
				)}
			</button>

			<div
				className={`flex flex-col justify-between transition-all duration-300 ${
					isOpen ? 'opacity-100' : 'hidden opacity-0'
				}`}>
				{/* @ts-ignore */}
				<iframe
					className={`mb-10 transition-opacity duration-300 ${
						isOpen ? 'block px-5 opacity-100' : 'hidden opacity-0'
					}`}
					src='//ntmaker.gfto.ru/newneontext/?image_height=70&image_width=200&image_font_shadow_width=2&image_font_size=36&image_background_color=141316&image_text_color=220FB2&image_font_shadow_color=9386E7&image_url=&image_text=Contact&image_font_family=RafaleRU&'
					frameBorder='no'
					scrolling='no'
					width='200'
					height='70'></iframe>

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
				<UserCircle2Icon className='text-blue1' />
				<span className='text-white/70'>{user?.name}</span>
			</div>
		</aside>
	)
}

export default Sidebar
