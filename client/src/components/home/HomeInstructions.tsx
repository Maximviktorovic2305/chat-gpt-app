import { INSTRUCTION_CHAT_ITEMS } from '@/constants/instruction-chat-items'
import HomeInstructionsItem from './HomeInstructionsItem'

const HomeInstructions = () => {
	return (
		<div className='mt-20'>
         <div className='text-center text-2xl mb-5'>Как использовать ChatGPT и Mistral AI?</div>
			{INSTRUCTION_CHAT_ITEMS.map(item => (
				<HomeInstructionsItem
					id={item.id}
					text={item.text}
					title={item.title}
					key={item.id}
				/>
			))}
		</div>
	)
}

export default HomeInstructions