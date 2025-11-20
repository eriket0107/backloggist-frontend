import { ItemsTable } from '@/components/ItemsTable';
import { AnimatePresence, motion } from "motion/react";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { useItemsPage } from "./ItemsPage/hooks/useItemsPage";



export const ItemsPage = () => {
  const {
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
    handlePreviousPage
  } = useItemsPage()

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex w-full  md:items-center mb-6 md:gap-10 gap-4 justify-between">
        <h2 className="text-2xl font-bold text-theme!">Items</h2>

        <div className="flex">
          <motion.div
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            className={cn("flex items-center p-1 bg-gray-100 rounded-md",)}>
            <Button variant='ghost' onClick={handleMobileAction}>
              <Search size={16} />
            </Button>
            {!isHovered && <Button variant='ghost' onClick={onClearSearch}>
              <Plus size={16} />
            </Button>}
            <AnimatePresence>
              {(isHovered || !!debouncedSearchTerm.length) &&
                (
                  <>
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: INPUT_WIDTH, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      value={debouncedSearchTerm}
                      onChange={handleOnSearchChange}
                      className="rounded-md outline-none selection:bg-gray-500/20"
                      placeholder="Buscar itens..."
                    />
                    <Button variant='ghost' onClick={onClearSearch}>
                      <X size={16} />
                    </Button>
                  </>
                )
              }
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <ItemsTable
        items={value?.data || []}
        isLoading={isPending}
        isFetching={isFetching}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        isFirstPage={value?.isFirstPage}
        isLastPage={value?.isLastPage}
      />
    </div>
  );
};
