import { userService } from "@/services/user"
import type { RegistrationVariables } from "@/types/common"
import type { User } from "@/types/entities"
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query"

export const useSignUp = (options?: UseMutationOptions<Omit<User, 'password'>, Error, RegistrationVariables>) => {
  const queryClient = useQueryClient()

  return useMutation<Omit<User, 'password'>, Error, RegistrationVariables>({
    mutationKey: ['users'],
    mutationFn: async ({ email, password, name }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      return await userService.signUp({ email, password, name })
    },
    ...options,
  })
} 