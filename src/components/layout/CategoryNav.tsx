
import Link from "next/link";

const categories = [
  {
    label: "ALL",
    href: "/shop",
  },
  {
    label: "ELECTRONICS",
    href: "/shop?category=electronics",
  },
  {
    label: "FASHION",
    href: "/shop?category=fashion",
  },
  {
    label: "BEAUTY",
    href: "/shop?category=beauty",
  },
  {
    label: "HOME",
    href: "/shop?category=home",
  },
  {
    label: "GROCERY",
    href: "/shop?category=grocery",
  },
];

export default function CategoryNav() {
  return (
    <nav
      aria-label="Product categories"
      className="border-b border-border"
    >
      <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-4 md:px-8">
        {categories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="flex min-h-12 shrink-0 items-center border-b-2 border-transparent text-xs font-semibold tracking-wider text-text-secondary transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
