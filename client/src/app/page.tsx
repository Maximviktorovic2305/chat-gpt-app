import HomeFooter from '@/components/home/HomeFooter'
import HomeForWhom from '@/components/home/HomeForWhom'
import HomeHeader from '@/components/home/HomeHeader'
import HomeHero from '@/components/home/HomeHero'
import HomeInstructions from '@/components/home/HomeInstructions'
import HomeTryIt from '@/components/home/HomeTryIt'
import HomeUses from '@/components/home/HomeUses'
import { Metadata } from 'next'

const site = process.env.NEXT_PUBLIC_DEPLOY_SITE_ADDRESS

export const metadata: Metadata = {
  title: 'Contact — Нейросеть для работы, кода, учёбы и чата.',
  description:
    'Используйте Contact — бесплатную платформу с нейросетью, интегрирующей ChatGPT и MistralAI, для решения задач по программированию, обучению, работе и общению.',
  keywords: [
    'нейросеть',
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
  authors: [{ name: 'Максим Переверзев', url: site }],
  openGraph: {
    title: 'Contact — Нейросеть для кода, учёбы, работы и чата. Все бесплатно!',
    description:
      'Используйте Contact — бесплатную платформу с нейросетью, интегрирующей ChatGPT и MistralAI, для решения задач по программированию, обучению, работе и общению.',
    url: `${site}`,
    type: 'website',
    images: [
      {
        url: '/meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросеть Contact — ChatGPT & MistralAI для кода, учёбы, работы и чата. Все бесплатно!',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Нейросеть для кода, учёбы, работы и чата. Все бесплатно!',
    description:
      'Используйте Contact — бесплатную платформу с нейросетью, интегрирующей ChatGPT и MistralAI, для решения задач по программированию, обучению, работе и общению.',
    images: ['/meta.jpg'],
  },
  alternates: {
    canonical: `${site}`,
  },
  robots: {
    index: true,  
    follow: true, 
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
