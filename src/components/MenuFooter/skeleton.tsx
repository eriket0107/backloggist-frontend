import { Skeleton as SkeletonBase } from "../ui/skeleton";

export const MenuFooterSkeleton = () => {
  return (
    <div className="flex flex-col gap-0.5">
      <SkeletonBase className="h-5 w-24" />
      <SkeletonBase className="h-5 w-32 hidden lg:block" />
    </div>
  );
};
