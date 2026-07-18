'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { User } from '@/entities/user'
import { AuthService } from '../api/auth.service'

const authSessionKey = ['auth', 'session'] as const

export const useAuthState = () => {
	const query = useQuery({
		queryKey: authSessionKey,
		queryFn: async (): Promise<User> => (await AuthService.refresh()).user,
		retry: false,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	})

	return {
		user: query.data ?? null,
		isLoading: query.isPending,
	}
}

export const useAuthActions = () => {
	const queryClient = useQueryClient()
	const loginMutation = useMutation({
		mutationFn: AuthService.login,
		onSuccess: data => queryClient.setQueryData(authSessionKey, data.user),
	})
	const registerMutation = useMutation({
		mutationFn: AuthService.register,
		onSuccess: data => queryClient.setQueryData(authSessionKey, data.user),
	})
	const logoutMutation = useMutation({
		mutationFn: AuthService.logout,
		onMutate: () => queryClient.setQueryData(authSessionKey, null),
		onSettled: () => queryClient.clear(),
	})

	return {
		login: loginMutation.mutateAsync,
		register: registerMutation.mutateAsync,
		logout: logoutMutation.mutate,
		isPending:
			loginMutation.isPending ||
			registerMutation.isPending ||
			logoutMutation.isPending,
	}
}
