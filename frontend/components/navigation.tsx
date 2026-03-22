import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-20 py-5 backdrop-blur">
      <div className="rounded-[2rem] border border-border bg-panel px-4 py-4 shadow-[0_18px_50px_rgba(18,34,43,0.05)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand-mark.svg"
              alt="Nourmed"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl border border-border bg-panel-strong p-2"
            />
            <div>
              <p className="text-sm font-semibold tracking-tight text-foreground">Nourmed</p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted">
                Secure Systems
              </p>
            </div>
          </Link>
          <nav
            aria-label="Primary navigation"
            className="flex flex-wrap items-center gap-2 sm:justify-end"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
