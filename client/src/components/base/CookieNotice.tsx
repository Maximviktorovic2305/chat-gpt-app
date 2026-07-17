'use client'

import { useEffect, useState } from 'react'
import { Bot, Cookie, Sparkles } from 'lucide-react'

const STORAGE_KEY = 'ai-contact-cookie-notice-accepted-v1'

export default function CookieNotice() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			setIsVisible(localStorage.getItem(STORAGE_KEY) !== 'true')
		})

		return () => cancelAnimationFrame(frame)
	}, [])

	if (!isVisible) return null

	const accept = () => {
		localStorage.setItem(STORAGE_KEY, 'true')
		setIsVisible(false)
	}

	return (
		<aside
			className='ai-cookie-notice fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border border-violet-400/30 bg-[#18171f]/95 p-4 text-white shadow-2xl shadow-violet-950/60 backdrop-blur-xl'
			role='status'
			aria-live='polite'>
			<div className='absolute -right-10 -top-10 size-28 rounded-full bg-violet-500/20 blur-3xl' />
			<div className='absolute -bottom-12 left-8 size-24 rounded-full bg-cyan-400/10 blur-3xl' />
			<div className='relative flex gap-3'>
				<div className='relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-400/15 ring-1 ring-violet-300/25'>
					<Cookie className='size-5 text-violet-200' />
					<Sparkles className='absolute -right-1 -top-1 size-3 text-cyan-300' />
				</div>
				<div className='min-w-0 flex-1'>
					<div className='mb-1 flex items-center gap-2 font-semibold'>
						<Bot className='size-4 text-cyan-300' />
						Файлы cookie
					</div>
					<p className='text-sm leading-5 text-zinc-300'>
						Мы используем cookie, чтобы сохранять настройки и поддерживать безопасную сессию чата.
					</p>
					<button
						type='button'
						onClick={accept}
						className='mt-3 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400'>
						Понятно
					</button>
				</div>
			</div>
		</aside>
	)
}
