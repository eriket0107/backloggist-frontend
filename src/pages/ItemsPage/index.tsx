import { ItemsTable } from '@/components/ItemsTable';
import { AnimatePresence, motion } from "motion/react";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { useItemsPage } from './hooks/useItemsPage';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';



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
    handlePreviousPage,
    handleRowClick,
    handleClearFilter,

  } = useItemsPage()

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex w-full  md:items-center mb-6 md:gap-10 gap-4 justify-between md:static sticky top-0  z-10">
        <h2 className="text-3xl font-bold text-theme!">Items</h2>

        <div className="flex bg-gray-100 rounded-md">
          <motion.div
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            className={cn("flex items-center",)}>
            <Button variant='ghost' size="lg" onClick={handleMobileAction}>
              <Search size={16} />
            </Button>

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
                      className=" rounded-md outline-none selection:bg-gray-500/20"
                      placeholder="Buscar itens..."
                    />
                    {isHovered && <Button variant='ghost' onClick={onClearSearch}>
                      <X size={16} />
                    </Button>}
                  </>
                )
              }

            </AnimatePresence>
          </motion.div>
          <Tooltip>
            <TooltipContent>
              Adicionar novo item
            </TooltipContent>
            <TooltipTrigger>
              <Button variant='ghost' size="lg" className={cn('text-gray-50 bg-theme rounded-l-none! transition-all hover:bg-theme/90!', isHovered && 'md:block hidden')} >
                <Plus size={16} />
              </Button>
            </TooltipTrigger>
          </Tooltip>

          <Button onClick={handleClearFilter} variant='link' size="lg" className='transition-all hover:bg-gray-200/50 text-gray-600 rounded-l-none! md:flex hidden'>
            Limpar filtros
          </Button>
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
        onRowClick={handleRowClick}
      />
    </div >
  );
};
