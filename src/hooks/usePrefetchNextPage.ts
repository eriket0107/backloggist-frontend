import { itemService } from "@/services/items";
import { useQueryClient } from "@tanstack/react-query";

export const usePrefetchNextPage = async ({ page, searchTerm, enabled }: { page: number, searchTerm: string, enabled: boolean }) => {
  const queryClient = useQueryClient();

  if (!enabled) return;

  return await queryClient.prefetchQuery({
    queryKey: ['items-list', 5, page + 1, searchTerm],
    queryFn: async () => await itemService.list({ filters: { limit: 1, page: page + 1, searchTerm } }),
    staleTime: 1000 * 60 * 5,
  });
}
