import Link from 'next/link'
import { Button } from '../ui/button'

interface Props {
	size: 's' | 'l'
	className?: string
}

const ButtonTryIt = ({ size, className }: Props) => {
	return (
		<Link href='/chat'>
			<Button
				className={`bg-white/30 text-white/50 hover:bg-gray2 hover:text-white/70 shadow-md shadow-black3 ${
					size === 'l' ? 'px-10 py-5 text-[18px]' : ''
				} ${className}`}>
				Попробуйте сейчас
			</Button>
		</Link>
	)
}

export default ButtonTryIt
