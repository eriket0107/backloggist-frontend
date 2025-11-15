import {
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "@/components/ui/toast";
import { authService } from "@/services/auth";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate()
	return useMutation<void, Error, void>({
		mutationFn: async () => {
			try {
				await authService.logout();
				queryClient.invalidateQueries({ queryKey: ["user"] });
				navigate({
					to: '/auth/login',
					replace: true
				})
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
