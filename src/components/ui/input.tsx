import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = Readonly<InputHTMLAttributes<HTMLInputElement>>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors",
        "placeholder:text-zinc-400",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        "disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
