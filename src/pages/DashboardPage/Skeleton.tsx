import { Skeleton as SkeletonBase } from "@/components/ui/skeleton";

export const SkeletonMenuBottom = () => {
  return (
    <>
      <div className="flex flex-col gap-0.5">
        <SkeletonBase className="h-5 w-24" />
        <SkeletonBase className="h-5 w-32 hidden lg:block" />
      </div>
      <SkeletonHeader />
    </>
  );
};

export const SkeletonHeader = () => {
  return (
    <SkeletonBase className="w-[40px] h-[40px]  rounded-full lg:flex hidden" />
  );
};

export const SkeletonLogoutButton = () => {
  return <SkeletonBase className="h-10 w-16 rounded-md" />;
};
