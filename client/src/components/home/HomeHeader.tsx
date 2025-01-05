'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { Webhook } from 'lucide-react'
import ButtonTryIt from '../base/ButtonTryIt'
import { Button } from '../ui/button'
import Link from 'next/link'

const HomeHeader = () => {
	const [visible, setVisible] = useState(true)
	const lastScrollY = useRef(0)

	const handleScroll = useCallback(() => {
		const currentScrollY = window.scrollY

		if (currentScrollY <= 0) {
			setVisible(true) // Если прокрутка в самом верху, показываем заголовок
		} else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
			setVisible(false) // Прокрутка вниз
		} else {
			setVisible(true) // Прокрутка вверх
		}

		lastScrollY.current = currentScrollY // Обновление последнего положения прокрутки
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [handleScroll])

	return (
		<header
			className={`fixed z-10 top-0 left-0 right-0 px-[3%] bg-transparent mx-auto text-white/70 py-3 flex gap-3 items-center justify-between transition-transform duration-300 ${
				visible ? 'translate-y-0' : '-translate-y-full'
			}`}>
			<div className='flex items-center gap-3'>
				<Webhook className='cursor-pointer hover:text-white duration-200' />
				<span>Нейросеть онлайн</span>
			</div>
			<div className='flex justify-self-end'>
				<Link className='max-sm:hidden' href='/chat'>
					<ButtonTryIt size='s' />
				</Link>
				<Link href='/auth/login'>
					<Button
						variant='ghost'
						className='text-white/70 hover:bg-transparent hover:text-white'>
						Войти
					</Button>
				</Link>
			</div>
		</header>
	)
}

export default HomeHeader
