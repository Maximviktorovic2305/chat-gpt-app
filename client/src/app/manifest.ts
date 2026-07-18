import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/config'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${SITE_NAME} — AI-ассистент`,
		short_name: SITE_NAME,
		description: SITE_DESCRIPTION,
		start_url: '/',
		display: 'standalone',
		background_color: '#141415',
		theme_color: '#141415',
		lang: 'ru',
		icons: [
			{
				src: '/faviconka.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	}
}
