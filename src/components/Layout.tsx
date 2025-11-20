import { cn } from "@/utils";
import type { ReactNode } from "react";

interface LayoutProps {
  props?: React.HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className, props }: LayoutProps) => (
  <div
    className={cn(
      `flex min-h-dvh flex-col items-center justify-center bg-gray-900`,
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
