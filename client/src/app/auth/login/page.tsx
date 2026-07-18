import { LoginScreen } from '@/screens/auth'
import { NO_INDEX_PAGE } from '@/shared/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Вход',
	description: 'Войдите в аккаунт Contact.',
	...NO_INDEX_PAGE,
}

export default function LoginPage() {
	return <LoginScreen />
}
