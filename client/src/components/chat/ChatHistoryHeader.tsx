import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { CircleHelp, House } from 'lucide-react'
import Link from 'next/link'

const ChatHistoryHeader = () => {
	return (
		<div className='flex items-center gap-3 justify-between'>
			<div className='flex mb-3 items-center gap-1'>
				<h2 className='font-bold text-sm text-gray1'>История переписки:</h2>
				<HoverCard>
					<HoverCardTrigger asChild>
						<CircleHelp className='w-4 h-auto cursor-pointer text-gray1 hover:text-white duration-200' />
					</HoverCardTrigger>
					<HoverCardContent className='w-full max-w-[200px]'>
						<div className='text-[12px] text-white/30 mb-1'>
							История переписки
						</div>
						Нейросеть использует историю чата в качестве оперативной памяти для
						генерации следующих ответов.
					</HoverCardContent>
				</HoverCard>
			</div>
			<Link href='/'>
				<div className='font-bold text-sm text-gray1 flex items-center gap-2 hover:text-white/50 duration-200'>
					На главную
					<House className='w-[18px] h-auto' />
				</div>
			</Link>
		</div>
	)
}

export default ChatHistoryHeader
