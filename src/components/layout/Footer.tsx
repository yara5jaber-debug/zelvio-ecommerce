
import Link from "next/link";

const shopLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Electronics", href: "/shop?category=electronics" },
  { label: "Fashion", href: "/shop?category=fashion" },
  { label: "Beauty", href: "/shop?category=beauty" },
  { label: "Home", href: "/shop?category=home" },
  { label: "Grocery", href: "/shop?category=grocery" },
];

const developerEmail = "yara.5jaber@gmail.com";

const linkedinUrl =
  "https://www.linkedin.com/in/yara-jaber-07430b377";

export default function Footer() {
  return (
    <footer className="bg-foreground px-5 pb-28 pt-14 text-white md:px-8 md:pb-12 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/20 pb-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="ZELVIO homepage"
              className="inline-block text-3xl font-extrabold uppercase tracking-[-0.04em]"
            >
              ZELVIO
              <span className="text-accent">.</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
              The everyday edit. Thoughtfully selected
              essentials for modern living.
            </p>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              CURATED FOR YOUR WORLD.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer shop navigation">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.16em]">
              EXPLORE
            </h2>

            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.16em]">
              CONNECT
            </h2>

            <div className="flex flex-col items-start gap-4">
              {/* Email */}
              <a
                href={`mailto:${developerEmail}`}
                className="text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Email
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                LinkedIn ↗
              </a>

              <a
                href={`mailto:${developerEmail}`}
                className="break-all text-xs text-white/45 transition-colors hover:text-white"
              >
                {developerEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col gap-5 pt-7 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-xs text-white/50">
            © 2026 ZELVIO. All rights reserved.
          </p>

          {/* Developer attribution */}
          <p className="text-[11px] uppercase tracking-[0.1em] text-white/50">
            DESIGNED & DEVELOPED BY{" "}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              YARA JABER
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
