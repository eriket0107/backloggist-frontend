import { itemService } from "@/services/items";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query"

export const useItemDelete = (options?: UseMutationOptions<void, unknown, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await itemService.remove(id);
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    ...options
  })
}