import { Link } from "@tanstack/react-router";
import type { ReactNode, ComponentProps, ElementType } from "react";
import { cn } from "@/utils";

interface NavigateButtonProps {
  iconStart?: ElementType;
  iconEnd?: ElementType;
  to: ComponentProps<typeof Link>["to"];
  className?: string;
  children: ReactNode;
}

export const NavigateButton = ({
  iconStart: IconStart,
  iconEnd: IconEnd,
  to,
  className,
  children,
}: NavigateButtonProps) => {
  return (
    <Link
      to={to}
      className={cn(
        `mt-4 text-theme text-sm
          transition-all no-underline! 
          cursor-pointer border-b border-transparent 
          hover:border-theme
          rounded-none
          py-0! px-0!
          group
          flex items-center gap-0
          `,
        className
      )}
      preload="intent"
    >
      {IconStart && <IconStart height={16} className="animate-bounce-x" />}
      {children}
      {IconEnd && <IconEnd height={16} className="animate-bounce-x" />}
    </Link>
  );
};
