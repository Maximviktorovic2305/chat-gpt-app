'use client'

import type { PropsWithChildren } from 'react'
import { useAuthState } from './use-auth'

export default function AuthProvider({ children }: PropsWithChildren) {
	useAuthState()
	return children
}
