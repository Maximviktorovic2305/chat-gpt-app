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
	title: 'Главная страница | Contact',
	description: 'Узнайте больше о наших услугах и возможностях.',
	keywords: ['Contact', 'ChatGpt', 'Mistral', 'chat', 'ИИ', 'нейросеть', 'чат', 'услуги', 'Искусственный интеллект'],
	authors: [{ name: 'Contact AI' }],
	openGraph: {
		 title: 'Главная страница - Contact',
		 description: 'Узнайте больше о наших услугах и возможностях.',
		//  @TODO заменить на реальный
		 url: `${site}`,
		 type: 'website',
		 images: ['https://www.etcentric.org/wp-content/uploads/2024/03/Mistral_AI_Logo_Banner-200x113.jpeg'],
	},
	alternates: {
		 canonical: `${site}`,
	},
};

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
