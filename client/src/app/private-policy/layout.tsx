import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Политика конфиденциальности - Contact',
	description: 'Политика в отношении обработки персональных данных платформы Contact. Узнайте больше о том, как мы обрабатываем ваши персональные данные.',
// 	robots: {
// 		index: false,
// 		follow: false,
//   },
};

export default function PolicyLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	return (
		<div className="bg-black3">
			<div className='bg-black3 fixed inset-0 h-5 text-white' />
			<div className='bg-black3 text-white'>{children}</div>
		</div> 
	)
}
