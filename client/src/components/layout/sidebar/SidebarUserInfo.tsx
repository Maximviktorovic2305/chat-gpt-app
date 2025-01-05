import { useUser } from '@/hooks/useSelectors'
import { UserCircle2Icon } from 'lucide-react'

interface Props {
	isOpen: boolean
}

const SidebarUserInfo = ({ isOpen }: Props) => {
	const { user } = useUser() || { user: { name: 'Гость' } }
	return (
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
	)
}

export default SidebarUserInfo