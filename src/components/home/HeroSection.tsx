
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-accent px-5 py-16 text-foreground md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]">
          THE EVERYDAY EDIT
        </p>

        <h1 className="max-w-3xl text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase">
          GOOD THINGS.
          <span className="block">EVERY DAY.</span>
        </h1>

        <p className="mt-6 max-w-md text-sm leading-6 md:text-base">
          Discover useful finds across fashion, tech, beauty,
          home and more.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-[2px] bg-foreground px-7 py-3 text-sm font-semibold tracking-wider text-white uppercase"
        >
          SHOP THE EDIT
        </Link>
      </div>
    </section>
  );
}
