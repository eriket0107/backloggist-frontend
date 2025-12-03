import { itemService } from "@/services/items";
import type { Item } from "@/types/entities";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query"


export const useItemUpdate = (options?: UseMutationOptions<Item, Error, { itemId: string; data: Partial<Item & { file: File }> }>) => {
  return useMutation({
    mutationKey: ['item-update'],
    mutationFn: async ({ itemId, data }) => await itemService.update(itemId, data),

    onSettled: (_, __, ___, ____, context) => {
      context.client.invalidateQueries({ queryKey: ['items-list'] });
    },
    onMutate: async ({ itemId, data }, context) => {
      await context.client.cancelQueries({ queryKey: ['items-list'] });

      const previousItems = context.client.getQueryData<Partial<Item>[]>(['items-list']);

      if (previousItems) {
        context.client.setQueryData<Partial<Item>[]>(['items-list'], previousItems.map(item => item.id === itemId ? { ...item, ...data } : item));
      }

      return { previousItems };
    },
    onError: (_, __, onMutateResult: unknown, context) => {
      const mutateResult = onMutateResult as { previousItems?: Partial<Item>[] } | undefined;
      context.client.setQueryData<Partial<Item>[]>(['items-list'], mutateResult?.previousItems);
      options?.onError?.(_, __, onMutateResult, context);
    },
    ...options,
  })
}
