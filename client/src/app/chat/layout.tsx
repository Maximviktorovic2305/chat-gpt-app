import BodyLayout from '@/components/layout/BodyLayout'
import { Metadata } from 'next'

const site = process.env.NEXT_PUBLIC_DEPLOY_SITE_ADDRESS

export const metadata: Metadata = {
	title: 'Contact | Нейросеть',
	description:
		'Общайтесь с искусственным интеллектом онлайн на русском языке. Бесплатно, без регистрации, без SMS и VPN. Используйте ChatGPT и MistralAI для кода, учёбы, работы и других задач.',
	keywords: [
		'нейросеть',
		'aicontact',
		'ai contact',
    	'contact ai',
		'aicontact.tech',
		'ChatGPT',
		'Contact',
    	'Kontact',
		'chat gpt',
		'контакт',
		'нейросеть контакт',
		'MistralAI',
		'мистрал',
		'чат-бот',
		'код',
		'программирование',
		'учеба',
		'работа',
		'AI',
		'искусственный интеллект',
		'бесплатный чат',
		'чат с ИИ',
		'чат без регистрации',
		'бесплатная нейросеть',
		'бесплатный AI',
		'бесплатное обучение',
		'бесплатные нейросети для разработчиков',
		'бесплатный чат с ИИ',
		'чат с нейросетью',
		'чат без смс',
		'чат без впн',
		'общение с ИИ',
	],
	authors: [{ name: 'AI Contact', url: site }],
	openGraph: {
		title: 'Чат с нейросетью — MistralAI. Все бесплатно!',
		description:
			'Общайтесь с искусственным интеллектом онлайн на русском языке. Бесплатно, без регистрации, без SMS и VPN. Используйте ChatGPT и MistralAI для кода, учёбы, работы и других задач.',
		url: `${site}/chat`,
		type: 'website',
		images: [
			{
				url: `${site}/meta.png`,
				width: 1200,
				height: 630,
				alt: 'Чат с нейросетью — MistralAI. Все бесплатно!',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Чат с нейросетью — MistralAI. Все бесплатно!',
		description:
			'Общайтесь с искусственным интеллектом онлайн на русском языке. Бесплатно, без регистрации, без SMS и VPN. Используйте ChatGPT и MistralAI для кода, учёбы, работы и других задач.',
		images: [`${site}/meta.png`],
	},
	alternates: {
		canonical: `${site}/chat`,
	},
	robots: 'index, follow',
	icons: {
		icon: `${site}/faviconka.ico`,
	}         
}

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div lang='ru' className='size-full'>
			<BodyLayout>{children}</BodyLayout>
		</div>
	)
}
