type TagManagerProps = Readonly<{
  className?: string;
  variant?: "filters" | "manage" | "list";
}>;

export function TagManager({
  className = "",
  variant = "filters",
}: TagManagerProps) {
  return (
    <div
      className={className}
      data-slot={`tag-manager-${variant}`}
      aria-label={
        variant === "filters"
          ? "Tag filters"
          : variant === "manage"
            ? "Manage tags"
            : "My tags"
      }
    />
  );
}
