import HomeFooter from '@/components/home/HomeFooter'
import HomeForWhom from '@/components/home/HomeForWhom'
import HomeHeader from '@/components/home/HomeHeader'
import HomeHero from '@/components/home/HomeHero'
import HomeInstructions from '@/components/home/HomeInstructions'
import HomeTryIt from '@/components/home/HomeTryIt'
import HomeUses from '@/components/home/HomeUses'

export default function Home() {
	return (
		<div className='relative h-full bg-[#141415] text-white/70 min-h-screen max-w-[1100px] xl:max-w-[1400px] px-[2%] mx-auto'>
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
