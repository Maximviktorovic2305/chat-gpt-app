/* eslint-disable @next/next/no-img-element */
import localFont from 'next/font/local'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Script from 'next/script'
import Providers from '@/app/_providers/Providers'
import {
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
	SOCIAL_IMAGE,
} from '@/shared/config'
import YandexMetrikaTracker from '@/shared/ui/YandexMetrikaTracker'
import CookieNotice from '@/shared/ui/CookieNotice'

export const metadata: Metadata = {
	metadataBase: SITE_URL,
	applicationName: SITE_NAME,
	title: {
		default: `${SITE_NAME} — бесплатный AI-ассистент`,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	category: 'technology',
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	referrer: 'origin-when-cross-origin',
	formatDetection: { email: false, address: false, telephone: false },
	icons: { icon: '/faviconka.ico', shortcut: '/faviconka.ico' },
	manifest: '/manifest.webmanifest',
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		siteName: SITE_NAME,
		title: `${SITE_NAME} — бесплатный AI-ассистент`,
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		images: [SOCIAL_IMAGE],
	},
	twitter: {
		card: 'summary',
		title: `${SITE_NAME} — бесплатный AI-ассистент`,
		description: SITE_DESCRIPTION,
		images: [SOCIAL_IMAGE.url],
	},
	verification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
		? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
		: undefined,
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#141415',
	colorScheme: 'dark',
}

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
			<body
				suppressHydrationWarning
				className={`${geistSans.variable} ${geistMono.variable} bg-[#141415] size-full antialiased`}>
				<Providers>
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
					<CookieNotice />
				</Providers>
			</body>
		</html>
	)
}
