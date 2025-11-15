import {
	type UseQueryOptions,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { authService } from "@/services/auth";
import type { Session } from "@/types/entities";

export const useSession = (
	options?: UseQueryOptions<Session, Error, Session>,
) => {
	const queryClient = useQueryClient();
	return useQuery<Session, Error, Session>({
		queryKey: ["session"],
		queryFn: async () => {
			try {
				const session = await authService.session();
				return session;
			} catch (error) {
				if (isAxiosError(error) && error.response?.status === 401) {
					queryClient.clear();
					throw new Error("Unauthorized");
				}
				throw error;
			}
		},
		staleTime: 1000 * 30 * 1,
		...options,
	});
};
