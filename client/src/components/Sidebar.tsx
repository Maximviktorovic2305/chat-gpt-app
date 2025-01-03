'use client'

import { useChat, useUser } from '@/hooks/useSelectors'
import { UserCircle2Icon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Chatquestion from './chat/Chatquestion'

const Sidebar = () => {
	const { user } = useUser() || { user: { name: 'Гость' } }
	const { history } = useChat()
	const firstQuestion = history[0]?.content

	return (
		<aside className='size-full bg-black1 border-r-2 shadow-r-lg shadow-white border-black3 min-h-screen flex flex-col justify-between'>
			<div>
				<Image
					src='/i1.png'
					width={200}
					height={200}
					alt='logo.png'
					className='w-full'
				/>

				<div className='px-5 mb-5'>
					<div className='flex items-center gap-3 mb-2'>
						<span>Нейросеть Mistral AI</span>
					</div>
					<div className='text-[12px] text-gray1'>
						Используйте нейросеть{' '}
						<span className='text-white/30 font-bold'>Mistral AI</span> для
						генерации текста, понимания языка и других задач
					</div>
				</div>
				<div className='px-5 text-white/70 text-[12px]'>История запросов</div>
				{firstQuestion && (
					<div className='px-5'>
						<Chatquestion question={firstQuestion} />
					</div>
				)}
			</div>

			<div className='flex justify-start mb-5 items-center gap-3 px-5'>
				<UserCircle2Icon className='text-blue1' />
				{user?.name}
			</div>
		</aside>
	)
}

export default Sidebar
