import { api } from "@/api"
import type { FilterParams } from "@/types/common";
import type { Item } from "@/types/entities";
import type { PaginatedResult } from "@/types/pagination";
import { errorHandler } from "@/utils/error-handler"


const get = async (id: string) => {
  try {
    const result = await api.get<{ data: Item }>(`/items/${id}`)
    return result.data
  }
  catch (error) {
    throw errorHandler(error)
  }
}

const list = async ({ filters = {} }: FilterParams) => {
  const filterNormalized: Required<FilterParams['filters']> = {
    isPublic: false,
    limit: 10,
    page: 1,
    searchTerm: '',
    ...filters,
  }

  const urlFilters = new URLSearchParams()
  Object.entries(filterNormalized).forEach(([key, value]) => {
    if (key === 'searchTerm' && !value) return
    urlFilters.append(key, String(value))
  })

  try {
    const result = await api.get<PaginatedResult<Item>>(`/items?${urlFilters}`)

    return result.data
  }
  catch (error) {
    throw errorHandler(error)
  }
}

const create = async (data: Partial<Item>) => {
  try {
    const result = await api.post<Item>('/items', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return result.data
  }
  catch (error) {
    throw errorHandler(error)
  }
}

const update = async (id: string, data: Partial<Item>) => {
  try {
    const result = await api.patch<Item>(`/items/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return result.data
  }
  catch (error) {
    throw errorHandler(error)
  }
}

const remove = async (id: string) => {
  try {
    await api.delete(`/items/${id}`)
  }
  catch (error) {
    throw errorHandler(error)
  }
}

export const itemService = {
  list,
  create,
  get,
  update,
  remove,
}