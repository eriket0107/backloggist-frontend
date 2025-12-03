import { itemService } from "@/services/items"
import type { Item } from "@/types/entities"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

export const useItemGetById = ({ id, options }: { id?: string, options: UseQueryOptions<Item, Error, Item> }) => {
  return useQuery({
    queryFn: async () => {
      if (!id) return Promise.reject(new Error("Item ID is required"));
      const { data } = await itemService.get(id);
      return data
    },
    enabled: !!id,
    ...options,
  })
}