import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности',
	description:
		'Политика обработки персональных данных платформы Contact.',
	alternates: { canonical: '/private-policy' },
	robots: { index: true, follow: true },
}

export default function PolicyLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='bg-black3'>
			<div className='bg-black3 fixed inset-0 h-5 text-white' />
			<div className='bg-black3 text-white'>{children}</div>
		</div>
	)
}
