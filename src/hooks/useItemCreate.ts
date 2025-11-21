import { itemService } from "@/services/items"
import type { Item } from "@/types/entities"
import { useMutation, type UseMutationOptions } from "@tanstack/react-query"

export const useItemCreate = (options?: UseMutationOptions<Partial<Item & { file: File }>, Error, Partial<Item & { file: File }>>) => {
  return useMutation<Partial<Item & { file: File }>, Error, Partial<Item & { file: File }>>({
    mutationKey: ['createItem'],
    mutationFn: async (data: Partial<Item & { file: File }>) => {
      return await itemService.create(data)
    },
    onMutate: async (newItem, context) => {
      await context.client.cancelQueries({ queryKey: ['items-list'] })

      const previousItems = context.client.getQueryData<Partial<Item>[]>(['items-list'])

      if (previousItems) {
        context.client.setQueryData<Partial<Item>[]>(['items-list'], [
          ...previousItems,
          newItem,
        ])
      }

      return { previousItems }
    },
    onError: (_, __, onMutateResult: unknown, context) => {
      const mutateResult = onMutateResult as { previousItems?: Partial<Item>[] } | undefined
      context.client.setQueryData<Partial<Item>[]>(['items-list'], mutateResult?.previousItems)
    },
    onSettled: (_, __, ___, ____, context) => {
      context.client.invalidateQueries({ queryKey: ['items-list'] })
    }
    ,
    ...options
  })
}