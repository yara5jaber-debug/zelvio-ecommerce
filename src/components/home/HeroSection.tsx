
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="overflow-hidden bg-background px-5 py-12 md:px-8 md:py-14"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Editorial content */}
        <div className="relative z-10">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            ZELVIO / THE EVERYDAY EDIT
          </p>

          <h1
            id="hero-heading"
            className="max-w-[680px] text-[clamp(2.5rem,4.5vw,4.5rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-foreground"
          >
            CURATED FOR
            <span className="block">YOUR WORLD.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-text-secondary md:text-base">
            Discover thoughtfully selected finds across fashion,
            technology, beauty, home and more.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-4 rounded-[2px] bg-foreground px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85"
          >
            EXPLORE THE COLLECTION
            <span aria-hidden="true">↗</span>
          </Link>

          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
              THE EDIT / 01
            </span>

            <span className="text-xs text-text-secondary">
              Everyday essentials, thoughtfully chosen.
            </span>
          </div>
        </div>

        {/* Editorial image composition */}
        <div className="relative mx-auto h-[340px] w-full max-w-[500px] sm:h-[440px] lg:h-[480px]">
          <div className="absolute right-0 top-0 h-[78%] w-[65%] bg-[#E3DCD0]">
            <Image
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=85"
              alt="Selected fashion accessory"
              fill
              sizes="(max-width: 1024px) 65vw, 340px"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute bottom-0 left-0 z-10 h-[72%] w-[57%] border-[6px] border-background bg-[#D5DCE0]">
            <Image
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&auto=format&fit=crop&q=85"
              alt="Close-up of a curated accessory"
              fill
              sizes="(max-width: 1024px) 57vw, 290px"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute bottom-4 right-0 border-t border-foreground pt-3 text-right">
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground sm:text-[10px]">
              OBJECTS OF EVERYDAY DESIRE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
