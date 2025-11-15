import {
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "@/components/ui/toast";
import { authService } from "@/services/auth";
import type { Session } from "@/types/entities";
import type { LoginVariables } from "@/types/common";

export const useLogin = (
	options?: UseMutationOptions<Session, Error, LoginVariables>,
) => {
	const queryClient = useQueryClient();

	return useMutation<Session, Error, LoginVariables>({
		mutationFn: async ({ email, password }) => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			try {
				await authService.signIn({ email, password });
				const session = await authService.session();

				return session;
			} catch (error) {
				if (isAxiosError(error)) {
					console.error(error.message);
					toast.error(error.message);
					throw new Error(error.message);
				}

				throw new Error((error as Error).message);
			}
		},
		...options,
	});
};
