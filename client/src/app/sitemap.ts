import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/shared/config'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: absoluteUrl('/'),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: absoluteUrl('/chat'),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: absoluteUrl('/private-policy'),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	]
}
