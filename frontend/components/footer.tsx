export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Nourmed. Secure digital infrastructure foundations.</p>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
          Dockerized. Modular. Future-ready.
        </p>
      </div>
    </footer>
  );
}
