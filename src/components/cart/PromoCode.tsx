
"use client";

import { useState, type FormEvent } from "react";

type PromoCodeProps = {
  appliedCode: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
};

export default function PromoCode({
  appliedCode,
  onApply,
  onRemove,
}: PromoCodeProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const isApplied = appliedCode !== null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedCode = code.trim().toUpperCase();

    if (normalizedCode !== "SAVE10") {
      setError("Invalid promo code. Please try again.");
      return;
    }

    setError("");
    onApply(normalizedCode);
  }

  function handleRemove() {
    onRemove();
    setCode("");
    setError("");
  }

  return (
    <section
      aria-label="Promo code"
      className="border border-border p-5"
    >
      <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
        Promo Code
      </h2>

      {isApplied ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              ✓ {appliedCode} applied
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              You saved 10% on your order.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-xs font-semibold uppercase tracking-wider text-text-secondary underline underline-offset-4 hover:text-foreground"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setError("");
              }}
              placeholder="Enter promo code"
              aria-label="Promo code"
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? "promo-code-error" : undefined
              }
              autoComplete="off"
              className="min-h-12 min-w-0 flex-1 border border-border bg-transparent px-3 text-sm text-foreground outline-none focus:border-foreground"
            />

            <button
              type="submit"
              className="min-h-12 bg-foreground px-4 text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
            >
              Apply
            </button>
          </div>

          {error && (
            <p
              id="promo-code-error"
              role="alert"
              className="mt-3 text-xs text-sale-price"
            >
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
