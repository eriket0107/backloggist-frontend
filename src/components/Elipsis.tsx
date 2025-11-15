import type { ReactNode } from "react";

interface ElipsesProps {
  children: ReactNode;
  className?: string;
}

export const Elipses = ({ children, className }: ElipsesProps) => (
  <p className={className}>
    {children}
    <span className="inline-block animate-[bounce_1.5s_ease-in-out_infinite]">
      .
    </span>
    <span className="inline-block animate-[bounce_1.5s_ease-in-out_0.2s_infinite]">
      .
    </span>
    <span className="inline-block animate-[bounce_1.5s_ease-in-out_0.4s_infinite]">
      .
    </span>
  </p>
);
