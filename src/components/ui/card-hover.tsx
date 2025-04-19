
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardHoverProps {
  children: ReactNode;
  className?: string;
}

export function CardHover({ children, className }: CardHoverProps) {
  return (
    <div className={cn("relative rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-200 card-hover", className)}>
      {children}
    </div>
  );
}
