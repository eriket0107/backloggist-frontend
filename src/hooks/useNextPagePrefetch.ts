import { itemService } from "@/services/items";
import { useQueryClient } from "@tanstack/react-query";

export const useNextPagePrefetch = async ({ page, searchTerm = undefined, limit = 5, enabled = true }: { page: number, searchTerm?: string, limit?: number, enabled?: boolean }) => {
  const queryClient = useQueryClient();


  if (!enabled || searchTerm) return;

  return await queryClient.prefetchQuery({
    queryKey: ['items-list', limit, page + 1, searchTerm || undefined],
    queryFn: async () => await itemService.list({ filters: { limit, page: page + 1, searchTerm } }),
    staleTime: 1000 * 60 * 5,
  });
};
