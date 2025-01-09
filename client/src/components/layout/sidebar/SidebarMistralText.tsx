interface Props {
	isOpen: boolean
}

const SidebarMistralText = ({ isOpen }: Props) => {
	return (
		<div
			className={`mb-5 transition-transform duration-300 ${
				isOpen
					? 'transform translate-x-0 opacity-100 px-5'
					: '-translate-x-full opacity-0'
			}`}>
			<h2 className='flex items-center text-white/70 gap-3 mb-2'>
				Нейросеть Mistral AI
			</h2>
			<h3 className='text-[12px] ml-1 text-gray1'>
				Нейросеть{' '}
				<span className='text-white/50 font-bold'>Mistral AI</span> для
				генерации текста, понимания языка и других задач
			</h3>
		</div>
	)
}

export default SidebarMistralText
