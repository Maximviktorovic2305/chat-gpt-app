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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	return (
		<html lang='ru' className='size-full'>
			<Providers>
				<body
					className={`${geistSans.variable} ${geistMono.variable} bg-[#141415] size-full antialiased`}
					>
					{children}
				</body>
			</Providers>
		</html>
	)
}
