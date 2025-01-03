export default function PolicyLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className='bg-black3 text-white'>{children}</body>
		</html>
	)
}
