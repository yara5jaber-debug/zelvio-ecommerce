
import Link from "next/link";

const categories = [
  { label: "ALL", href: "/" },
  { label: "ELECTRONICS", href: "/shop/electronics" },
  { label: "FASHION", href: "/shop/fashion" },
  { label: "BEAUTY", href: "/shop/beauty" },
  { label: "HOME", href: "/shop/home" },
  { label: "GROCERY", href: "/shop/grocery" },
];

export default function CategoryNav() {
  return (
    <nav
      aria-label="Product categories"
      className="border-b border-border"
    >
      <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-4 md:px-8">
        {categories.map((category, index) => (
          <Link
            key={category.href}
            href={category.href}
            aria-current={index === 0 ? "page" : undefined}
            className={`flex min-h-12 shrink-0 items-center border-b-2 text-xs font-semibold tracking-wider ${
              index === 0
                ? "border-foreground text-foreground"
                : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            {category.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
