import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Providers from '@/providers/Providers'

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
				<body
					className={`${geistSans.variable} ${geistMono.variable} bg-[#141415] overflow-x-hidden antialiased`}
					>
					{children}
				</body>
			</Providers>
		</html>
	)
}
