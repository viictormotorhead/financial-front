import { TagIcon } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ManageTagsButtonProps = Readonly<{
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}>;

export function ManageTagsButton({
  onClick,
  className,
  compact = false,
}: ManageTagsButtonProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100",
          className,
        )}
        aria-label="Gestionar tags"
      >
        <TagIcon />
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn("shrink-0", className)}
      aria-label="Gestionar tags"
    >
      <TagIcon className="text-zinc-500" />
      Gestionar Tags
    </Button>
  );
}
