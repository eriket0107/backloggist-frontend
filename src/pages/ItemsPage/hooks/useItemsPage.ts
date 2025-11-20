import { breakpoints } from "@/constants/break-points";
import { useItemList } from "@/hooks/useItemList";
import { debounce } from "@/utils/debounce";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";

export const useItemsPage = () => {

  const INPUT_WIDTH = breakpoints.medium < window.innerWidth ? 200 : 150

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [searchTerm, setSearchTerm] = useQueryState('search', { defaultValue: '' });

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

  const { data: value, isPending, isFetching } = useItemList({
    filters: {
      limit: 5,
      searchTerm: searchTerm || undefined,
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

  const handleNextPage = () => {
    if (value?.isLastPage || isPending) return;
    setPage((prev) => prev + 1);
  }

  const handlePreviousPage = (() => {
    if (value?.isFirstPage || isPending) return;
    setPage((prev) => prev - 1);
  })

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
  }
}