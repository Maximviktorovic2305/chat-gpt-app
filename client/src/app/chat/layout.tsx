import BodyLayout from '@/components/layout/BodyLayout'
import { Metadata } from 'next'

const site = process.env.NEXT_PUBLIC_DEPLOY_SITE_ADDRESS

export const metadata: Metadata = {
	title: 'Страница чата | Contact',
	description: 'Общайтесь с Искусственным интеллектом онлайн без регистрации VPN и смс на русском языке',
	keywords: [
		'Contact',
		'ChatGpt',
		'Mistral',
		'chat',
		'ИИ',
		'нейросеть',
		'чат',
		'Искусственный интеллект',
	],
	authors: [{ name: 'Contact AI' }],
	openGraph: {
		title: 'Чат - Contact',
		description: 'Общайтесь с Искусственным интеллектом онлайн без регистрации VPN и смс на русском языке',
		//  @TODO заменить на реальный
		url: `${site}`,
		type: 'website',
		images: [
			'https://www.etcentric.org/wp-content/uploads/2024/03/Mistral_AI_Logo_Banner-200x113.jpeg',
		],
	},
	alternates: {
		canonical: `${site}`,
	},
	robots: {
		index: true,
		follow: true,
  },
}

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div lang='ru'>
			<BodyLayout>{children}</BodyLayout>
		</div>
	)
}
