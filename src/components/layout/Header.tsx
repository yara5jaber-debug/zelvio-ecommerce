
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <button
          type="button"
          aria-label="Open menu"
          className="flex min-h-11 min-w-11 items-center justify-center text-2xl md:hidden"
        >
          ☰
        </button>

        <Link
          href="/"
          className="text-xl font-extrabold tracking-[-0.03em]"
        >
          STORE.
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="flex min-h-11 items-center justify-center px-2 text-sm font-semibold"
          >
            BAG (0)
          </Link>
        </div>
      </div>
    </header>
  );
}
