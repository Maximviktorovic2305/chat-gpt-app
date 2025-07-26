/* eslint-disable @next/next/no-img-element */
import localFont from 'next/font/local'
import './globals.css'
import Script from 'next/script'
import Providers from '@/providers/Providers'
import YandexMetrikaTracker from '@/components/base/YandexMetrikaTracker'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const YANDEX_METRIKA_ID = 103491241

	return (
		<html lang='ru' className='size-full'>
			<head>
				<link rel='icon' href='/faviconka.ico' type='image/x-icon' />
			</head>
			<Providers>
				<body
					className={`${geistSans.variable} ${geistMono.variable} bg-[#141415] size-full antialiased`}>
					{children}

					{/* Yandex.Metrika counter */}
					<Script id='yandex-metrika' strategy='afterInteractive'>
						{`
                        (function(m,e,t,r,i,k,a){
                            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

                        ym(${YANDEX_METRIKA_ID}, 'init', {
                            ssr:true,
                            webvisor:true,
                            clickmap:true,
                            ecommerce:"dataLayer",
                            accurateTrackBounce:true,
                            trackLinks:true
                        });
                    `}
					</Script>
					{/* No-script fallback для пользователей без JS, размещается прямо в body */}
					<noscript>
						<div>
							<img
								src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
								style={{ position: 'absolute', left: '-9999px' }}
								alt=''
							/>
						</div>
					</noscript>
					{/* /Yandex.Metrika counter */}
					{/* Добавляем компонент для отслеживания SPA-переходов */}
					<YandexMetrikaTracker metrikaId={YANDEX_METRIKA_ID} />
				</body>
			</Providers>
		</html>
	)
}
