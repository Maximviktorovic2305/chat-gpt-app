'use client'

interface Props {
	id: number
	title: string
	text: string
}

const HomeInstructionsItem = ({ id, title, text }: Props) => {
	return (
		<section className='flex justify-center py-4'>
			<div className='flex items-center max-w-[900px] w-full'>
				<div className='flex items-center gap-5 w-full'>
					<div className='circle hover:bg-gray2 cursor-pointer duration-200'>{id}</div>
					<div>
						<div className='text-white/80'>{title}</div>
						<div className='text-sm text-white/50'>{text}</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				.circle {
					display: flex;
					justify-content: center;
					align-items: center;
					min-width: 40px;
					height: 40px;
					border: 2px solid #7ca9bf;
					border-radius: 50%;
					font-weight: bold;
					text-align: center;
				}
			`}</style>
		</section>
	)
}

export default HomeInstructionsItem
