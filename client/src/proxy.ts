import { NextRequest, NextResponse } from 'next/server'

const METRIKA_ORIGINS = [
	'https://mc.yandex.ru',
	'https://mc.yandex.az',
	'https://mc.yandex.by',
	'https://mc.yandex.co.il',
	'https://mc.yandex.com',
	'https://mc.yandex.com.am',
	'https://mc.yandex.com.ge',
	'https://mc.yandex.com.tr',
	'https://mc.yandex.ee',
	'https://mc.yandex.fr',
	'https://mc.yandex.kg',
	'https://mc.yandex.kz',
	'https://mc.yandex.lt',
	'https://mc.yandex.lv',
	'https://mc.yandex.md',
	'https://mc.yandex.tj',
	'https://mc.yandex.tm',
	'https://mc.yandex.uz',
	'https://mc.webvisor.com',
	'https://mc.webvisor.org',
]

const METRIKA_WEBSOCKET_ORIGINS = METRIKA_ORIGINS.map((origin) =>
	origin.replace('https://', 'wss://'),
)

const METRIKA_FRAME_ANCESTORS = [
	'https://metrika.yandex.ru',
	'https://analytics.yandex.by',
	'https://analytics.yandex.com',
	'https://analytics.yandex.com.tr',
	'https://analytics.yandex.kz',
	'https://analytics.yandex.ru',
	'https://metr.yandex.by',
	'https://metr.yandex.com',
	'https://metr.yandex.com.tr',
	'https://metr.yandex.kz',
	'https://metr.yandex.ru',
	'https://metrica.ya.ru',
	'https://metrica.yandex',
	'https://metrica.yandex.by',
	'https://metrica.yandex.com',
	'https://metrica.yandex.com.tr',
	'https://metrica.yandex.kz',
	'https://metrica.yandex.ru',
	'https://metrika.ya.ru',
	'https://metrika.yandex',
	'https://metrika.yandex.by',
	'https://metrika.yandex.com',
	'https://metrika.yandex.com.tr',
	'https://metrika.yandex.kz',
	'https://metrika.yandex.uz',
]

const createNonce = () => Buffer.from(crypto.randomUUID()).toString('base64')

export function proxy(request: NextRequest) {
	const nonce = createNonce()
	const isDevelopment = process.env.NODE_ENV !== 'production'
	const apiOrigin = (() => {
		try {
			return new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? request.url).origin
		} catch {
			return request.nextUrl.origin
		}
	})()
	const metrikaOrigins = METRIKA_ORIGINS.join(' ')
	const directives = [
		"default-src 'self'",
		`script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDevelopment ? " 'unsafe-eval'" : ''} ${metrikaOrigins} https://yastatic.net`,
		"style-src 'self' 'unsafe-inline'",
		`img-src 'self' data: blob: ${metrikaOrigins}`,
		`connect-src 'self' ${apiOrigin} ${metrikaOrigins} ${METRIKA_WEBSOCKET_ORIGINS.join(' ')}`,
		"font-src 'self' data:",
		`child-src blob: ${metrikaOrigins}`,
		`frame-src blob: ${metrikaOrigins}`,
		"worker-src 'self' blob:",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		`frame-ancestors 'self' ${METRIKA_FRAME_ANCESTORS.join(' ')}`,
		...(isDevelopment ? [] : ['upgrade-insecure-requests']),
	]
	const contentSecurityPolicy = directives.join('; ')
	const requestHeaders = new Headers(request.headers)
	requestHeaders.set('x-nonce', nonce)
	requestHeaders.set('Content-Security-Policy', contentSecurityPolicy)

	const response = NextResponse.next({ request: { headers: requestHeaders } })
	response.headers.set('Content-Security-Policy', contentSecurityPolicy)
	return response
}

export const config = {
	matcher: [
		{
			source:
				'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
}
