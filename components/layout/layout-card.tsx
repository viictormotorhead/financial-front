import type { ReactNode } from "react";

type LayoutCardProps = Readonly<{
  title: string;
  subtitle?: string;
  headerAction?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}>;

export function LayoutCard({
  title,
  subtitle,
  headerAction,
  footer,
  children,
  className = "",
}: LayoutCardProps) {
  return (
    <section
      className={`flex flex-col rounded-xl border border-zinc-200/80 bg-white shadow-sm ${className}`}
    >
      <header className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
          ) : null}
        </div>
        {headerAction}
      </header>
      <div className="min-h-0 flex-1 px-5 py-4">{children}</div>
      {footer ? (
        <footer className="border-t border-zinc-100 px-5 py-3">{footer}</footer>
      ) : null}
    </section>
  );
}
