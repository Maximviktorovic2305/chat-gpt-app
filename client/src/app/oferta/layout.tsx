export default function OfertaLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div lang='ru'>
			<div className='bg-black3 text-white'>{children}</div>
		</div>
	)
}
