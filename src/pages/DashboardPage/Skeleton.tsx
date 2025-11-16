import { Skeleton as SkeletonBase } from "@/components/ui/skeleton";

export const SkeletonHeader = () => {
  return <SkeletonBase className="w-[40px] h-[40px]  rounded-full lg:flex" />;
};

export const SkeletonLogoutButton = () => {
  return <SkeletonBase className="h-10 w-16 rounded-md" />;
};
