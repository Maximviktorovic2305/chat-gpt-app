import type { Metadata } from 'next'
import BodyLayout from '@/components/layout/BodyLayout'

export const metadata: Metadata = {
	title: 'Gpt App',
	description: 'Gpt chat application for all',
}

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div lang='en'>
			<BodyLayout>{children}</BodyLayout>
		</div>
	)
}
