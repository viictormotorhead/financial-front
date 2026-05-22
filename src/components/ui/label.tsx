import type { LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type LabelProps = Readonly<
  LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }
>;

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-sm font-medium text-zinc-700", className)}
      {...props}
    >
      {children}
    </label>
  );
}
