'use client'

import { useUser } from '@/hooks/useSelectors'
import { CircleHelp, DoorClosed, DoorOpen } from 'lucide-react'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

const Header = () => {
	const { user } = useUser()

	return (
		<div className='px-4 py-3 flex items-center justify-between'>
         <div className='flex items-center gap-2'>
         <span className='text-white/50'>Нейросети Mistral AI</span>
			<HoverCard>
				<HoverCardTrigger asChild>
               
					<CircleHelp className='w-4 h-auto cursor-pointer text-gray1 hover:text-white duration-200' />
				</HoverCardTrigger>
				<HoverCardContent className='w-full text-[12px] max-w-[400px]'>
					<div className='text-[12px] text-white/30 mb-1'>
						Нейросети Mistral AI
					</div>
					Нейросети Mistral AI — это модели, разработанные компанией Mistral,
					которые нацелены на решения различных задач в области обработки
					естественного языка. Они используют современные подходы в машинном
					обучении, включая архитектуры, подобные трансформерам, что позволяет
					им эффективно анализировать и генерировать текст.
				</HoverCardContent>
			</HoverCard>
         </div>
			{!user ? (
				<Link
					href='/auth/register'
					className='flex items-center gap-3 cursor-pointer text-gray1 hover:text-white duration-200'>
					<span>Войти</span>
					<DoorOpen />
				</Link>
			) : (
				<Link
					href='/auth/register'
					className='flex items-center gap-3 cursor-pointer text-gray1 hover:text-red-500 duration-200'>
					<span>Выйти</span>
					<DoorClosed />
				</Link>
			)}
		</div>
	)
}

export default Header
