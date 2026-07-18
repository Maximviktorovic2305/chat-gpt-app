import { Chat } from '@/widgets/chat'
import { Header } from '@/widgets/header'

export function ChatScreen() {
	return (
		<div className='size-full flex flex-col'>
		<div className='w-full max-w-[900px] self-center px-4 sm:px-[10%]'>
			<Header />
		</div>
			<Chat />
		</div>
	)
}
