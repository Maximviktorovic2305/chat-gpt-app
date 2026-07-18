import type { Prisma } from '../generated/prisma/client'

export const publicUserSelect = {
	id: true,
	name: true,
	email: true,
	isAdmin: true,
	createdAt: true,
	updatedAt: true,
} satisfies Prisma.UserSelect
