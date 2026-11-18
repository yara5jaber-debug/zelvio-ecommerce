
import { Suspense } from "react";

import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";

function TrendingSkeleton() {
  return (
    <section
      aria-label="Loading trending products"
      aria-busy="true"
      className="bg-background px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-border pb-8 md:mb-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            ZELVIO / THE EDIT / 001
          </p>

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-foreground">
            TRENDING NOW
            <span className="text-accent">.</span>
          </h2>

          <p className="mt-4 text-sm text-text-secondary">
            The pieces worth a closer look.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="min-w-0">
              <div className="aspect-[4/5] animate-pulse bg-image-sand" />

              <div className="space-y-3 pt-4">
                <div className="h-3 w-20 animate-pulse bg-border" />
                <div className="h-4 w-full animate-pulse bg-border" />
                <div className="h-4 w-3/4 animate-pulse bg-border" />
                <div className="mt-4 h-5 w-20 animate-pulse bg-border" />
              </div>
            </div>
          ))}
        </div>

        <span className="sr-only">
          Loading trending products...
        </span>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />

      <Suspense fallback={<TrendingSkeleton />}>
        <TrendingSection />
      </Suspense>

      <FeaturedCategories />
    </main>
  );
}
