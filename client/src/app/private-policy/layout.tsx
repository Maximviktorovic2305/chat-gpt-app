export default function PolicyLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div lang='en'>
			<div className='bg-black3 text-white'>{children}</div>
		</div>
	)
}
