'use client'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
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
        <div className='bg-black1 flex size-full'>
            <div>
                <Sidebar />
            </div>
            <div className='bg-black2 text-white w-full flex-1'>
                <Header />
                {children}
            </div>
        </div>
    )
}

export default BodyLayout
