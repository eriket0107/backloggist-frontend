import { itemService } from "@/services/items";
import { useQueryClient } from "@tanstack/react-query";


export const usePreftechItem = () => {
  const queryClient = useQueryClient();

  const prefetchItem = async (itemId: string) => {
    return await queryClient.prefetchQuery({
      queryKey: ['item', itemId],
      queryFn: async () => await itemService.get(itemId),
      staleTime: 1000 * 60 * 5,
    });
  };

  return { prefetchItem };
}