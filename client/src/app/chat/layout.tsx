import { BodyLayout } from '@/widgets/chat-layout'
import { ChatProvider } from '@/features/chat'
import { SITE_NAME, SOCIAL_IMAGE } from '@/shared/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Чат с нейросетью',
	description:
		'Общайтесь с искусственным интеллектом онлайн на русском языке. Бесплатно, без регистрации, без SMS и VPN',
	keywords: [
		'нейросеть',
		'aicontact',
		'ai contact',
    	'contact ai',
		'ai-contact.site',
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
	openGraph: {
		title: 'Чат с нейросетью — MistralAI. Все бесплатно!',
		description:
			'Общайтесь с искусственным интеллектом онлайн на русском языке. Бесплатно, без регистрации, без SMS и VPN. Используйте ChatGPT и MistralAI для кода, учёбы, работы и других задач.',
		url: '/chat',
		type: 'website',
		siteName: SITE_NAME,
		images: [SOCIAL_IMAGE],
	},
	twitter: {
		card: 'summary',
		title: 'Чат с нейросетью — MistralAI. Все бесплатно!',
		description:
			'Общайтесь с искусственным интеллектом онлайн на русском языке. Бесплатно, без регистрации, без SMS и VPN. Используйте ChatGPT и MistralAI для кода, учёбы, работы и других задач.',
		images: [SOCIAL_IMAGE.url],
	},
	alternates: { canonical: '/chat' },
	robots: { index: true, follow: true },
}

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ChatProvider>
			<div lang='ru' className='size-full'>
				<BodyLayout>{children}</BodyLayout>
			</div>
		</ChatProvider>
	)
}
