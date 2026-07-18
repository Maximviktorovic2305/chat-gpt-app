export type TypeRole = 'admin' | 'user'

export interface AuthenticatedUser {
	id: number
	name: string | null
	email: string
	isAdmin: boolean
}
