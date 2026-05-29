import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CreateInvestmentButtonProps = Readonly<{
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}>;

function PlusIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function CreateInvestmentButton({
  onClick,
  className,
  compact = false,
}: CreateInvestmentButtonProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100",
          className,
        )}
        aria-label="Nueva inversión"
      >
        <PlusIcon />
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn("h-10 shrink-0 px-4", className)}
      aria-label="Nueva inversión"
    >
      <PlusIcon className="text-zinc-500" />
      Nueva inversión
    </Button>
  );
}
