'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useDeviceType } from '@/shared/model'
import Sidebar from './sidebar/Sidebar'

interface BodyLayoutProps {
	children: ReactNode
}

const BodyLayout = ({ children }: BodyLayoutProps) => {
	const deviceType = useDeviceType()
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		setIsSidebarOpen(deviceType !== 'mobile')
	}, [deviceType])

	return (
		<div className='flex h-screen items-center bg-black1'>
			<Sidebar
				isOpen={isSidebarOpen}
				onToggle={() => setIsSidebarOpen(current => !current)}
			/>
			<div className='size-full min-h-screen bg-black2 text-white'>{children}</div>
		</div>
	)
}

export default BodyLayout
