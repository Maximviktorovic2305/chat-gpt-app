import { RegisterScreen } from '@/screens/auth'
import { NO_INDEX_PAGE } from '@/shared/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Регистрация',
	description: 'Создайте аккаунт Contact.',
	...NO_INDEX_PAGE,
}

export default function RegisterPage() {
	return <RegisterScreen />
}
