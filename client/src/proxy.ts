import { NextRequest, NextResponse } from 'next/server'

const METRIKA_ORIGINS = [
	'https://mc.yandex.ru',
	'https://mc.yandex.com',
	'https://mc.webvisor.com',
	'https://mc.webvisor.org',
]

const METRIKA_WEBSOCKET_ORIGINS = METRIKA_ORIGINS.map((origin) =>
	origin.replace('https://', 'wss://'),
)

const METRIKA_FRAME_ANCESTORS = [
	'https://*.yandex.ru',
	'https://*.yandex.com',
	'https://*.yandex.by',
	'https://*.yandex.kz',
	'https://*.yandex.com.tr',
	'https://*.yandex.uz',
	'https://*.ya.ru',
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
