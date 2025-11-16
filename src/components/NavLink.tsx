import { cn } from "@/utils";
import { Link } from "@tanstack/react-router";
import { memo, type ElementType, type ReactNode } from "react";

interface NavLinkProps {
  to: string;
  isSelected: boolean;
  children?: ReactNode;
  icon: ElementType;
}

export const NavLink = memo(
  ({ icon: Icon, isSelected, to, children }: NavLinkProps) => {
    return (
      <Link
        key={to}
        to={to}
        className={cn(
          `rounded-sm flex text-xl  text-gray-100 
      hover:bg-[#e3b561] hover:text-gray-100
      0 items-center px-2 py-4 gap-2 lg:min-w-[200px] 
      w-full transition-all`,
          isSelected && "text-[#e3b561]"
        )}
      >
        <Icon height={24} />
        <p>{children}</p>
      </Link>
    );
  }
);
