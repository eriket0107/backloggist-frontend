import {
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "@/components/ui/toast";
import { logoutService } from "@/services/auth";

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, void>({
		mutationFn: async () => {
			try {
				await logoutService();
				queryClient.invalidateQueries({ queryKey: ["user"] });
				window.location.href = "/login";
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
