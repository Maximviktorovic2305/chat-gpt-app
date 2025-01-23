'use client'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/sidebar/Sidebar'
import useDeviceType from '@/hooks/useDeviceType'
import { setInitialState } from '@/store/sidebar/sidebar.slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const BodyLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {

	const dispatch = useDispatch()
	const deviceType = useDeviceType()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		const initialState = deviceType === 'mobile' ? false : true;
		dispatch(setInitialState(initialState));
	 }, [deviceType, dispatch]);

	return (
		<div className='size-full bg-black1 overflow-y-hidden flex items-center'>
			<Sidebar />
			<div className='bg-black2 text-white size-full w-full'>
				<Header />
				{children}
			</div>
		</div>
	)
}

export default BodyLayout
