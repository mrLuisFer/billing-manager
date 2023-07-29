import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="bg-[var(--primary-dark)] p-4 rounded-xl">
        <h1 className="text-center font-bold">Pagina no encontrada</h1>
        <p className="opacity-60 mb-2 text-center">
          Esto es un error 404! la pagina que buscas no fue encontrada, puedes
          regresar al{' '}
          <span className="px-2 py-1 bg-neutral-600 font-mono font-semibold text-sm rounded-lg">
            /login
          </span>
        </p>
        <Link
          href="/auth/login"
          className="py-2 mt-4 w-full bg-white text-black flex items-center justify-center rounded-lg font-semibold"
        >
          Regresar
        </Link>
      </section>
    </main>
  );
}
