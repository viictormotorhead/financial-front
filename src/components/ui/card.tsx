import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = Readonly<HTMLAttributes<HTMLElement> & { children: ReactNode }>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-xl border border-zinc-200/80 bg-white shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement> & { children: ReactNode }>) {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: Readonly<HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }>) {
  return (
    <h2
      className={cn("text-sm font-semibold text-zinc-800", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: Readonly<HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }>) {
  return (
    <p className={cn("mt-0.5 text-xs text-zinc-500", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement> & { children: ReactNode }>) {
  return (
    <div className={cn("min-h-0 flex-1 px-5 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement> & { children: ReactNode }>) {
  return (
    <footer
      className={cn("border-t border-zinc-100 px-5 py-3", className)}
      {...props}
    >
      {children}
    </footer>
  );
}

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
  className,
}: LayoutCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
        </div>
        {headerAction}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}
