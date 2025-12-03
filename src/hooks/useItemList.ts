import { itemService } from "@/services/items"
import type { FilterParams } from "@/types/common"
import type { Item } from "@/types/entities"
import type { PaginatedResult } from "@/types/pagination"
import { useQuery, type UseQueryOptions, keepPreviousData } from "@tanstack/react-query"



export const useItemList = ({ filters = {}, options }: {
  filters?: FilterParams['filters'],
  options?: UseQueryOptions<PaginatedResult<Item>, Error>
}) => {
  return useQuery({
    queryKey: ['items-list', filters?.limit, filters?.page, filters?.searchTerm || undefined],
    queryFn: async () => {
      return await itemService.list({ filters })
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options
  })
}