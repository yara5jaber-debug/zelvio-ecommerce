
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex min-h-11 items-center justify-center " +
    "rounded-[2px] px-6 py-3 text-sm font-semibold " +
    "uppercase tracking-wider transition-colors " +
    "duration-200 focus-visible:outline-2 " +
    "focus-visible:outline-offset-2 " +
    "focus-visible:outline-accent " +
    "disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-[#141414] text-white hover:bg-[#333333]",
    outline:
      "border border-border bg-transparent " +
      "text-foreground hover:bg-image-sand",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
