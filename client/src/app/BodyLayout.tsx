'use client'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { useSidebar } from '@/hooks/useSelectors'
import React from 'react'

const BodyLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {

   const { isOpen } = useSidebar()

	return (
		<div className='bg-black1' style={{ display: 'grid', gridTemplateColumns: isOpen ? '1fr 5fr' : '0fr 5fr' }}>
			<Sidebar />
			<div className='bg-black2 text-white w-full'>
				<Header />
				{children}
			</div>
		</div>
	)
}

export default BodyLayout
