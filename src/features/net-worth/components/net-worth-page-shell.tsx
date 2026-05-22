export function NetWorthPageShell() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <h1 className="hidden text-2xl font-semibold tracking-tight text-zinc-900 lg:block">
          Patrimonio
        </h1>
        <div
          className="mt-4 min-h-[200px] rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50"
          data-slot="net-worth-content"
        />
      </div>
    </main>
  );
}
