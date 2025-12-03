import { ItemsTableSkeleton } from "@/components/ItemsTable/skeleton";
import { cn } from "@/utils";

export const ItemsPageSkeleton = () => {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex w-full md:items-center mb-6 md:gap-10 gap-4 justify-between md:static sticky top-0 z-10">
        <h2 className="text-3xl font-bold text-theme!">Items</h2>

        <div className="flex bg-gray-100 rounded-md">
          <div className={cn("flex items-center")}>
            <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="w-12 h-12 bg-gray-200 rounded animate-pulse md:flex hidden"></div>

          <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <ItemsTableSkeleton />
    </div>
  );
};