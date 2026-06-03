import { Suspense } from "react";

import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Mi Finanzas
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Inicia sesión para acceder a tu información financiera.
          </p>
        </div>

        <Suspense fallback={<p className="text-center text-sm text-zinc-500">Cargando…</p>}>
          <div className="flex justify-center">
            <LoginForm />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
