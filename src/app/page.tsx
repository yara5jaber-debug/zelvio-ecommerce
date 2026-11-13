import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-12 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Design System / 01
        </p>

        <h1 className="max-w-3xl text-[40px] leading-[1.05] font-extrabold uppercase tracking-[-0.03em] sm:text-6xl">
          Everyday essentials.
          <br />
          Anything but ordinary.
        </h1>

        <p className="mt-6 max-w-xl text-base text-text-secondary">
          A modern shopping experience built around
          simplicity, clarity, and thoughtful design.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button>Explore Collection</Button>
          <Button variant="outline">View Categories</Button>
          <Button disabled>Unavailable</Button>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <h2 className="mb-5 text-2xl font-semibold">
            Color Palette
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="h-28 bg-image-sand" />
            <div className="h-28 bg-image-blue-gray" />
            <div className="h-28 bg-image-peach" />
            <div className="h-28 bg-image-sage" />
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <h2 className="text-2xl font-semibold">
            Typography
          </h2>

          <p className="mt-4 text-xl font-arabic"
             lang="ar"
             dir="rtl">
            تسوّق بأسلوب مختلف، واكتشف تفاصيل تستحق الاهتمام.
          </p>
        </div>
      </div>
    </main>
  );
}
