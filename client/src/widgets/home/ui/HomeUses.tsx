'use client'

import React from 'react'
import Image from 'next/image'
import { HOME_USES } from '../data/home-uses'

const HomeUses = () => {
	return (
		<section>
			<h2 className='text-2xl text-center mb-5 mt-20'>
				Что вы можете сделать с помощью нейросети
			</h2>
			<div className='grid grid-cols-3 max-sm:grid-cols-1 mx-auto max-w-[1000px] gap-3'>
				{HOME_USES.map(({ id, title, text, iconSrc, iconAlt }) => (
					<div
						className='relative p-3 flex rounded-lg shadow-md shadow-black3 border border-gray1 flex-col gap-3'
						key={id}>
						<div className='text-white/70'>{title}</div>
						<div className='relative'>
							<div className='float-left mr-3 mb-3'>
								<Image src={iconSrc} alt={iconAlt} width={80} height={80} />
							</div>
							<span className='text-white/50 text-sm'>{text}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default HomeUses
