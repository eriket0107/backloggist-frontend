import { itemService } from "@/services/items";
import { useQueryClient } from "@tanstack/react-query";


export const useItemPrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchItem = async (itemId: string) => {
    await queryClient.prefetchQuery({
      queryKey: ['item', itemId],
      queryFn: async () => await itemService.get(itemId),
      staleTime: 1000 * 60 * 5,
    });
  };

  return { prefetchItem };
}