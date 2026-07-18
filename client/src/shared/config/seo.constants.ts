import type { Metadata } from 'next'

export const SITE_NAME = 'Contact'
export const SITE_DESCRIPTION =
	'Бесплатный AI-ассистент на базе Mistral для учёбы, работы, программирования и повседневных задач.'

const fallbackSiteUrl = 'https://ai-contact.site'

const resolveSiteUrl = (): URL => {
	const configuredUrl = process.env.NEXT_PUBLIC_DEPLOY_SITE_ADDRESS
	try {
		return new URL(configuredUrl || fallbackSiteUrl)
	} catch {
		return new URL(fallbackSiteUrl)
	}
}

export const SITE_URL = resolveSiteUrl()
export const absoluteUrl = (path: string): string =>
	new URL(path, SITE_URL).toString()

export const SOCIAL_IMAGE = {
	url: absoluteUrl('/meta.png'),
	width: 328,
	height: 328,
	alt: `${SITE_NAME} — AI-ассистент для работы и учёбы`,
} as const

export const NO_INDEX_PAGE: Metadata = {
	robots: { index: false, follow: false, noarchive: true },
}
