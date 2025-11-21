import { itemService } from "@/services/items"
import type { FilterParams } from "@/types/common"
import type { Item } from "@/types/entities"
import type { PaginatedResult } from "@/types/pagination"
import { useQuery, type UseQueryOptions, keepPreviousData } from "@tanstack/react-query"
import { useSession } from "./useSession"



export const useItemList = ({ filters = {}, options }: {
  filters?: FilterParams['filters'],
  options?: UseQueryOptions<PaginatedResult<Item>, Error>
}) => {
  const session = useSession()

  return useQuery({
    queryKey: ['items-list', filters?.limit, filters?.page, filters?.searchTerm],
    queryFn: async () => {
      return await itemService.list({ filters })
    },
    placeholderData: keepPreviousData,
    enabled: !!session.data,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options
  })
}