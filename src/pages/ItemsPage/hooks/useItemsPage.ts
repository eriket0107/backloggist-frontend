import { breakpoints } from "@/constants/break-points";
import { useItemList } from "@/hooks/useItemList";
import { useItemPrefetch } from "@/hooks/useItemPrefetch";
import { useNextPagePrefetch } from "@/hooks/useNextPagePrefetch";
import { debounce } from "@/utils/debounce";
import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useState } from "react";

export const useItemsPage = () => {
  const INPUT_WIDTH = breakpoints.medium < window.innerWidth ? 200 : 150

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const [searchTerm, setSearchTerm] = useQueryState('search', { defaultValue: '' });
  const [, setItemId] = useQueryState('itemId', { defaultValue: '' });

  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

  const handleHoverStart = () => {
    setIsHovered(true);
  }

  const handleHoverEnd = () => {
    setIsHovered(false);
  }

  const handleMobileAction = () => {
    setIsHovered(prev => !prev);
  }
  const { prefetchItem } = useItemPrefetch()

  useNextPagePrefetch({ page });

  const { data: value, isPending, isFetching } = useItemList({
    filters: {
      limit: 5,
      searchTerm,
      page
    },
  });


  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearchTerm(e.target.value);
    debounce(() => {
      setSearchTerm(e.target.value)
      setPage(1);
    }, 1000)();
  }

  const onClearSearch = () => {
    setDebouncedSearchTerm('');
    setSearchTerm('');
    setIsHovered(false)
  }

  const handleNextPage = useCallback(() => {
    if (value?.isLastPage || isFetching) return;
    setPage((prev) => prev + 1);
  }, [value?.isLastPage, isFetching, setPage]);

  const handlePreviousPage = useCallback(() => {
    if (value?.isFirstPage || isFetching) return;
    setPage((prev) => prev - 1);
  }, [value?.isFirstPage, isFetching, setPage]);

  const handleRowClick = useCallback((id: string) => {
    setItemId(id);
  }, [setItemId]);

  const handleClearFilter = useCallback(() => {
    setItemId('');
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }, [setItemId, setSearchTerm,]);

  const handleCreateItem = useCallback(() => {
    setItemId('add-item')
  }, [setItemId]);

  const handlePrefetchItem = useCallback(async (itemId?: string) => {
    if (!itemId) return;
    await prefetchItem(itemId);
  }, [prefetchItem]);

  return {
    INPUT_WIDTH,
    isHovered,
    debouncedSearchTerm,
    value,
    isPending,
    isFetching,
    handleHoverStart,
    handleHoverEnd,
    handleMobileAction,
    handleOnSearchChange,
    onClearSearch,
    handleNextPage,
    handlePreviousPage,
    handleRowClick,
    handleClearFilter,
    handleCreateItem,
    handlePrefetchItem,
  }
}