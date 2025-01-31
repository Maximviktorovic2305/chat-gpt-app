interface Props {
	isOpen: boolean
}

const SidebarContactText = ({ isOpen }: Props) => {
	return (
		<div
			className={`mb-5 transition-transform duration-300 ${
				isOpen
					? 'transform translate-x-0 px-5'
					: '-translate-x-full '
			}`}>
			<h2 className='flex items-center text-white/70 gap-3 mb-2'>
				CONTACT
			</h2>
			<h3 className='text-[12px] ml-1 text-gray1'>
				Используйте платформу{' '}
				<span className='text-white/50 font-bold'>Contact</span> <span className="text-white/50">БЕСПЛАТНО</span> для работы с нейросетью <span className="text-white/50">Mistral Ai</span>
			</h3>
		</div>
	)
}

export default SidebarContactText
