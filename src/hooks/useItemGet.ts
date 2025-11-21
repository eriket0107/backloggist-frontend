import { itemService } from "@/services/items"
import type { Item } from "@/types/entities"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

export const useItemGet = (id: string, options?: UseQueryOptions<Item, Error, Item>) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: async () => { const { data } = await itemService.get(id); return data },
    enabled: !!id,
    ...options,
  })
}