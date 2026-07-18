import {
	HomeFooter,
	HomeForWhom,
	HomeHeader,
	HomeHero,
	HomeInstructions,
	HomeTryIt,
	HomeUses,
} from '@/widgets/home'

export function HomeScreen() {
	return (
		<section className='relative h-full bg-black1 text-white/70 min-h-screen w-full px-[2%] mx-auto'>
			<HomeHeader />
			<HomeHero />
			<HomeForWhom />
			<HomeInstructions />
			<HomeUses />
			<HomeTryIt />
			<HomeFooter />
		</section>
	)
}
