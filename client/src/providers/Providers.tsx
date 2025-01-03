'use client'

import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import store from '@/store/store'
import AuthProvider from './AuthProvider'

export default function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<Provider store={store}>
			<AuthProvider>{children}</AuthProvider>
		</Provider>
	)
}
