
"use client";

import { useState } from "react";

export type ShippingPaymentValues = {
  deliveryMethod: "standard";
  paymentMethod: "cash-on-delivery";
};

type ShippingPaymentStepProps = {
  onBack?: () => void;
  onContinue?: (values: ShippingPaymentValues) => void;
};

export default function ShippingPaymentStep({
  onBack,
  onContinue,
}: ShippingPaymentStepProps) {
  const [deliveryMethod] =
    useState<"standard">("standard");

  const [paymentMethod] =
    useState<"cash-on-delivery">("cash-on-delivery");

  const [isValidated, setIsValidated] = useState(false);

  function handleContinue() {
    const values: ShippingPaymentValues = {
      deliveryMethod,
      paymentMethod,
    };

    if (onContinue) {
      onContinue(values);
      return;
    }

    setIsValidated(true);
  }

  return (
    <section
      aria-labelledby="shipping-payment-heading"
      className="min-w-0"
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        STEP 02 / 03
      </p>

      <h2
        id="shipping-payment-heading"
        className="text-2xl font-extrabold uppercase tracking-[-0.03em] text-foreground md:text-3xl"
      >
        SHIPPING & PAYMENT
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary">
        Choose how your order will be delivered and how
        you would like to pay.
      </p>

      {/* Delivery method */}
      <div className="mt-10">
        <div className="border-b border-border pb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            DELIVERY METHOD
          </p>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Available delivery options for your order.
          </p>
        </div>

        <div className="mt-6">
          <div className="flex items-start gap-4 border border-foreground bg-image-sand p-5 sm:p-6">
            <span
              aria-hidden="true"
              className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-bold uppercase tracking-[0.04em] text-foreground">
                  STANDARD DELIVERY
                </h3>

                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  SELECTED
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Delivery availability, timing and charges
                will be confirmed before order placement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="mt-12">
        <div className="border-b border-border pb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            PAYMENT METHOD
          </p>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Select your preferred payment option.
          </p>
        </div>

        <div className="mt-6">
          <div className="flex items-start gap-4 border border-foreground bg-image-sand p-5 sm:p-6">
            <span
              aria-hidden="true"
              className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-bold uppercase tracking-[0.04em] text-foreground">
                  CASH ON DELIVERY
                </h3>

                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  SELECTED
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Pay when your order arrives. No online
                payment details are required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important notice */}
      <div className="mt-8 border-l-2 border-accent bg-image-sand px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-foreground">
          CHECKOUT PREVIEW
        </p>

        <p className="mt-2 text-sm leading-6 text-text-secondary">
          This is a demonstration checkout. No real order
          or payment will be processed.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-10 border-t border-border pt-7">
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            disabled={!onBack}
            className="flex min-h-12 items-center justify-center gap-2 border border-border px-6 text-xs font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <span aria-hidden="true">←</span>
            BACK TO ADDRESS
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="flex min-h-12 flex-1 items-center justify-center gap-3 bg-foreground px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            CONTINUE TO REVIEW
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {isValidated && (
          <p
            role="status"
            className="mt-5 border border-border p-4 text-sm leading-6 text-foreground"
          >
            Delivery and payment options confirmed for
            this preview. The review step is not connected yet.
          </p>
        )}
      </div>
    </section>
  );
}
