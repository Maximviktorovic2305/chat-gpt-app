import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Providers from '@/providers/Providers'
import Sidebar from '@/components/Sidebar'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Gpt App',
	description: 'Gpt chat application for all',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<Providers>
				<body className={`grid text-white ${geistSans.variable} ${geistMono.variable} antialiased`} style={{ gridTemplateColumns: '1fr 5fr' }}>
					<Sidebar />
					<div
						className='bg-black2'>
						{children}
					</div>
				</body>
			</Providers>
		</html>
	)
}
