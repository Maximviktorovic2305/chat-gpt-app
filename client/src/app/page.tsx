import type { Metadata } from 'next'
import { HomeScreen } from '@/screens/home'
import {
	absoluteUrl,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
	SOCIAL_IMAGE,
} from '@/shared/config'

export const metadata: Metadata = {
	title: { absolute: `${SITE_NAME} — бесплатный AI-ассистент` },
	description: SITE_DESCRIPTION,
	keywords: [
		'нейросеть',
		'AI-ассистент',
		'чат с ИИ',
		'MistralAI',
		'помощь в программировании',
		'искусственный интеллект',
		'бесплатный AI',
	],
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	openGraph: {
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
	alternates: { canonical: '/' },
	robots: { index: true, follow: true },
}

export default function Home() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: SITE_NAME,
		url: SITE_URL.toString(),
		description: SITE_DESCRIPTION,
		applicationCategory: 'UtilitiesApplication',
		operatingSystem: 'Any',
		inLanguage: 'ru',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB' },
		potentialAction: {
			'@type': 'UseAction',
			target: absoluteUrl('/chat'),
		},
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
				}}
			/>
			<HomeScreen />
		</>
	)
}
