
import { Skeleton } from "@/components/ui/skeleton";


export const ItemDialogSkeleton = () => {

  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-[268px] w-full rounded-md" />
        </div>

        <div className="flex  gap-2 justify-between">
          <Skeleton className="h-10 w-20 " />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>
    </div >
  );
}