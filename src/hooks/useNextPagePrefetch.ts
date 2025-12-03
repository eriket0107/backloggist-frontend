import { itemService } from "@/services/items";
import { useQueryClient } from "@tanstack/react-query";

export const useNextPagePrefetch = ({ page, searchTerm = undefined, limit = 5, enabled = true }: { page: number, searchTerm?: string, limit?: number, enabled?: boolean }) => {
  const queryClient = useQueryClient();

  if (!enabled || searchTerm) return;

  return queryClient.prefetchInfiniteQuery({
    queryKey: ['items-list', page + 1],
    queryFn: async () => await itemService.list({ filters: { limit, page: page + 1, searchTerm } }),
    initialPageParam: page + 1,
  });
};
