import React from 'react'
import ButtonTryIt from '../base/ButtonTryIt'
import { Accordion } from '../ui/accordion'
import HomeForWhomItem from './HomeForWhomItem'
import { HOME_FOR_WHOM_ITEMS } from '@/constants/home-for-whom-items'

const HomeForWhom = () => {
	return (
		<section className='max-w-[700px] mx-auto flex mt-10 flex-col gap-5'>
			<div className='text-center text-2xl'>Наш сервис подходит для всех</div>
			<Accordion type='single' collapsible className='w-full'>
				{HOME_FOR_WHOM_ITEMS.map(item => (
					<HomeForWhomItem
               title={item.title}
               description={item.description}
               key={item.id}
               value={item.id}
					/>
				))}
			</Accordion>

			<ButtonTryIt size='l' className='flex items-center justify-self-center' />
		</section>
	)
}

export default HomeForWhom
