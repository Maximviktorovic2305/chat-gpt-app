import type { MetadataRoute } from 'next'
import { absoluteUrl, SITE_URL } from '@/shared/config'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/auth/', '/api/'],
		},
		sitemap: absoluteUrl('/sitemap.xml'),
		host: SITE_URL.origin,
	}
}
