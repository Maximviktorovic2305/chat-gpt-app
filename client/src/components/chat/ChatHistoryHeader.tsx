import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { CircleHelp} from 'lucide-react'

const ChatHistoryHeader = () => {
	return (
		<div className='flex items-center gap-3 justify-between justify-self-center'>
			<div className='flex items-center gap-1'>
				<h2 className='font-bold text-sm text-gray1'>История переписки:</h2>
				<HoverCard>
					<HoverCardTrigger asChild>
						<CircleHelp className='w-4 h-auto cursor-pointer text-gray1 hover:text-white duration-200' />
					</HoverCardTrigger>
					<HoverCardContent className='w-full h-full max-w-[200px]'>
						<div className='text-[12px] text-white/30 mb-1'>
							История переписки
						</div>
						Нейросеть использует историю чата в качестве оперативной памяти для
						генерации следующих ответов.
					</HoverCardContent>
				</HoverCard>
			</div>
		</div>
	)
}

export default ChatHistoryHeader
