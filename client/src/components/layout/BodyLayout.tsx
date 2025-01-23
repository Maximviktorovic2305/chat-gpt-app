'use client'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/sidebar/Sidebar'
import React, { useEffect } from 'react'

const BodyLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className='size-full bg-black1 flex items-center'>
			<Sidebar />
			<div className='bg-black2 text-white size-full min-h-screen w-full'>
				<Header />
				{children}
			</div>
		</div>
	)
}

export default BodyLayout
