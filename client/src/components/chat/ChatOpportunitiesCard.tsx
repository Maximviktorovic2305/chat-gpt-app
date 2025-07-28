import { OpportunitiesCardsProps } from '@/types'

const ChatOpportunitiesCard = ({ Icon, id, title, text }: OpportunitiesCardsProps) => {
   let iconStyle   
   if (id === 1) {
      iconStyle = 'text-green-600'
   } else if (id === 2) {
      iconStyle = 'text-[#A172A5]'
   } else if (id === 3) {
      iconStyle = 'text-[#E2C542]'
   } else if (id === 4) {
      iconStyle = 'text-[#64ADC3]'
   }

	return (
		<div className='bg-inherit rounded-xl border flex flex-col gap-2 cursor-pointer border-gray1 hover:bg-black3 duration-200 p-3'>
			<div className='flex items-center gap-2'>
            <div className={iconStyle}><Icon /></div>
				<span className='text-sm font-bold text-white/80'>{title}</span>
			</div>
         <div className='text-[12px] text-gray1'>{text}</div>
		</div>
	)
}

export default ChatOpportunitiesCard
