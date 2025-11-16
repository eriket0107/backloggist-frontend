import type { Session } from "@/types/entities";
import { cn } from "@/utils";

interface AvatarProps {
  session: Session;
  className?: string;
}

export const Avatar = ({ session, className }: AvatarProps) => {
  const firstLetter = session?.user.name[0].toUpperCase();
  const secondLetter = session?.user.name[1].toUpperCase();

  return (
    <span
      className={cn(
        "bg-gray-900 border-2 p-1 rounded-full w-[40px] h-[40px] flex items-center justify-center",
        className
      )}
    >
      <p className="text-gray-50 text-xs">
        {firstLetter}
        {secondLetter}
      </p>
    </span>
  );
};
