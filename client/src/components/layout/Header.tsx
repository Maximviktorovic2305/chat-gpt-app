'use client'

import { useUser } from '@/hooks/useSelectors'
import { CircleHelp, DoorClosed, DoorOpen, House } from 'lucide-react'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { useActions } from '@/hooks/useActions'
import { ROUTES } from '@/constants/routes'
import { useEffect, useState } from 'react'

const Header = () => {
	const { user } = useUser()
	const { logout } = useActions()

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<div className='px-4 py-3 flex items-center gap-2 justify-between sm:mx-[8%]'>
			<div className='flex items-center gap-2'>
				<span className='text-white/50'>Нейросети Mistral AI</span>
				<HoverCard>
					<HoverCardTrigger asChild>
						<CircleHelp className='min-w-4 min-h-4 size-4 cursor-pointer text-gray1 hover:text-white duration-200' />
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
			{mounted &&
				(!user ? (
					<div className='flex items-center gap-3'>
						<Link
							className='flex items-center border-r-2 border-gray1 pr-3'
							href={ROUTES.home}>
							<div className='font-bold text-sm text-gray1 flex items-center gap-2 hover:text-white/80 duration-200'>
								<span className='max-sm:hidden'>На главную</span>
								<House className='w-5 h-auto' />
							</div>
						</Link>

						<Link
							href={ROUTES.register}
							className='flex items-center gap-2 cursor-pointer text-gray1 hover:text-white/80 duration-200'>
							<span className='text-sm'>Войти</span>
							<DoorOpen />
						</Link>
					</div>
				) : (
					<div className='flex items-center gap-3'>
						<Link
							className='flex items-center border-r-2 border-gray1 pr-3'
							href={ROUTES.home}>
							<div className='font-bold text-sm text-gray1 flex items-center gap-2 hover:text-white/80 duration-200'>
								<span className='max-sm:hidden'>На главную</span>
								<House className='w-5 h-auto' />
							</div>
						</Link>

						<Link
							href='#'
							onClick={(e) => {
								e.preventDefault()
								logout()
							}}
							className='flex items-center gap-2 cursor-pointer text-gray1 hover:text-red-500 duration-200'>
							<span className='text-sm'>Выйти</span>
							<DoorClosed />
						</Link>
					</div>
				))}
		</div>
	)
}

export default Header
