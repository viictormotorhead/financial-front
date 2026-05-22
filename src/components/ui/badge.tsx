import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "blue" | "green" | "purple" | "yellow";

type BadgeProps = Readonly<
  HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
    children: ReactNode;
  }
>;

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-100 text-zinc-700",
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  purple: "bg-violet-50 text-violet-700",
  yellow: "bg-amber-50 text-amber-700",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
