import Link from 'next/link'
import NeonLogo from '../layout/sidebar/NeonLogo'
import { ROUTES } from '@/constants/routes'

const HomeFooter = () => {
	return (
		<div className='flex items-center mb-5 gap-3 justify-between max-sm:flex max-sm:flex-col '>
			<NeonLogo />
			<div className='text-gray1 max-sm:text-sm'>
				<Link
					className='cursor-pointer text-gray1 hover:text-gray2 duration-200'
					href={ROUTES.oferta}>
					Оферта
				</Link>{' '}
				и{' '}
				<Link
					className='cursor-pointer text-gray1 hover:text-gray2 duration-200'
					href={ROUTES.privatePolicy}>
					Политика конфиденциальности
				</Link>
			</div>
		</div>
	)
}

export default HomeFooter
