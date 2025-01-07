import { OPPORTUNITIES_CARDS } from '@/constants/opportunities-cards'
import ChatOpportunitiesCard from './ChatOpportunitiesCard'

const ChatOpportunities = () => {
	return (
		<div className='grid grid-cols-4 mb-10 gap-[1%] max-w-[700px] mx-auto max-sm:grid-cols-2'>
			{OPPORTUNITIES_CARDS.map(card => (
				<ChatOpportunitiesCard
					id={card.id}
					title={card.title}
					text={card.text}
					Icon={card.Icon}
					key={card.id}
				/>
			))}
		</div>
	)
}

export default ChatOpportunities
