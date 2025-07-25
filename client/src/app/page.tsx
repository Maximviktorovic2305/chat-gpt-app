import HomeFooter from '@/components/home/HomeFooter'
import HomeForWhom from '@/components/home/HomeForWhom'
import HomeHeader from '@/components/home/HomeHeader'
import HomeHero from '@/components/home/HomeHero'
import HomeInstructions from '@/components/home/HomeInstructions'
import HomeTryIt from '@/components/home/HomeTryIt'
import HomeUses from '@/components/home/HomeUses'
import { Metadata } from 'next'

const site = process.env.NEXT_PUBLIC_DEPLOY_SITE_ADDRESS
const yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION

export const metadata: Metadata = {
  title: 'Contact — бесплатная платформа с нейросетью для работы, учебы, общения и много другого',
  description:
    'Используйте Contact — бесплатную платформу с нейросетью, интегрирующей MistralAI, для решения задач по программированию, обучению, работе и общению.',
  keywords: [
    'aicontact',
    'ai contact',
    'contact ai',
    'aicontact.tech',
    'contact',
    'Kontact',
    'нейросеть',
    'контакт',
    'нейросеть контакт',
    'ChatGPT',
    'chat gpt',
    'бесплатно',
    'без регистрации',
    'MistralAI',
    'мистрал',
    'чат-бот',
    'код',
    'программирование',
    'учеба',
    'работа',
    'AI',
    'искусственный интеллект',
    'нейро-ассистент',
    'AI chat',
    'нейросети',
    'чат с ИИ',
    'бесплатная нейросеть',
    'бесплатный AI',
    'бесплатное обучение',
    'бесплатные нейросети для разработчиков',
    'бесплатный чат с ИИ',
    'бесплатная помощь в коде',
  ],
  authors: [{ name: 'Contact', url: site }],
  openGraph: {
    title: 'Contact — бесплатная платформа с нейросетью для работы, учебы, общения и много другого',
    description:
      'Используйте Contact — бесплатную платформу с нейросетью, интегрирующей MistralAI, для решения задач по программированию, обучению, работе и общению.',
    url: `${site}`,
    type: 'website',
    images: [
      {
        url: `${site}/meta.png`,
        width: 630,
        height: 630,
        alt: 'Contact — бесплатная платформа с нейросетью для работы, учебы, общения и много другого',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — бесплатная платформа с нейросетью для работы, учебы, общения и много другого',
    description:
      'Используйте Contact — бесплатную платформу с нейросетью, интегрирующей MistralAI, для решения задач по программированию, обучению, работе и общению.',
    images: [`${site}/meta.png`],
  },
  alternates: {
    canonical: `${site}`,
  },
  robots: 'index, follow',
  // ✅ Метатег Яндекс-верификации
  other: {
    'yandex-verification': `${yandex}`,
  },
}

export default function Home() {
	return (
		<div className='relative h-full bg-[#141415] text-white/70 min-h-screen w-full px-[2%] mx-auto'>
			<HomeHeader />
			<HomeHero />
			<HomeForWhom />
			<HomeInstructions />
			<HomeUses />
			<HomeTryIt />
			<HomeFooter />
		</div>
	)
}
