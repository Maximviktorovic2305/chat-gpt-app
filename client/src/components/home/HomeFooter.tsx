import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

const HomeFooter = () => {
	return (
		<footer className='flex items-center pb-4 gap-3 justify-between max-sm:flex max-sm:flex-col '>
			<span className='text-xl'>Contact</span>
			<div className='text-gray1 max-sm:text-sm'>
				<Link
					className='cursor-pointer text-gray1 hover:text-gray2 duration-200'
					href={ROUTES.privatePolicy}>
					Политика конфиденциальности
				</Link>
			</div>
		</footer>
	)
}

export default HomeFooter
