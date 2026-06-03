import { LogoutButton } from "@/features/auth/components/logout-button";

export default function SettingsPage() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <h1 className="hidden text-2xl font-semibold tracking-tight text-zinc-900 lg:block">
          Configuración
        </h1>

        <section className="mt-6 max-w-md rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-zinc-900">Sesión</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Cierra sesión en este dispositivo. Tendrás que volver a iniciar
            sesión para ver tus datos.
          </p>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </section>
      </div>
    </main>
  );
}
