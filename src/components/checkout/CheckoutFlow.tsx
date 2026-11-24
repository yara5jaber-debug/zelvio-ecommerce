
"use client";

import { useState } from "react";
import CheckoutProgress from "./CheckoutProgress";
import ShippingAddressForm, {
  type ShippingAddressValues,
} from "./ShippingAddressForm";

import ShippingPaymentStep, {
  type ShippingPaymentValues,
} from "./ShippingPaymentStep";

type CheckoutStep = 1 | 2 | 3;

export default function CheckoutFlow() {
  const [step, setStep] = useState<CheckoutStep>(1);

  const [address, setAddress] =
    useState<ShippingAddressValues | null>(null);

  const [payment, setPayment] =
    useState<ShippingPaymentValues | null>(null);

  function handleAddressContinue(
    values: ShippingAddressValues
  ) {
    setAddress(values);
    setStep(2);
  }

  function handlePaymentContinue(
    values: ShippingPaymentValues
  ) {
    setPayment(values);
    setStep(3);
  }

  return (
    <div className="min-w-0">
        <CheckoutProgress currentStep={step} />
      {/* Step 01: Address
          Keep mounted to preserve input values. */}
      <div hidden={step !== 1}>
        <section aria-labelledby="shipping-heading">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            STEP 01 / 03
          </p>

          <h2
            id="shipping-heading"
            className="text-2xl font-extrabold uppercase tracking-[-0.03em] text-foreground md:text-3xl"
          >
            SHIPPING ADDRESS
          </h2>

          <p className="mt-4 text-sm leading-7 text-text-secondary">
            Tell us where you would like your order delivered.
          </p>

          <ShippingAddressForm
            onContinue={handleAddressContinue}
          />
        </section>
      </div>

      {/* Step 02: Shipping & Payment */}
      {step === 2 && (
        <ShippingPaymentStep
          onBack={() => setStep(1)}
          onContinue={handlePaymentContinue}
        />
      )}

      {/* Step 03: Review preview */}
      {step === 3 && address && payment && (
        <section aria-labelledby="review-heading">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            STEP 03 / 03
          </p>

          <h2
            id="review-heading"
            className="text-2xl font-extrabold uppercase tracking-[-0.03em] text-foreground md:text-3xl"
          >
            REVIEW YOUR DETAILS
          </h2>

          <p className="mt-4 text-sm leading-7 text-text-secondary">
            Check your information before continuing.
          </p>

          <div className="mt-8 border border-border p-5 sm:p-7">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                CONTACT INFORMATION
            </h3>

            <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-wider text-accent underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
                EDIT ADDRESS
            </button>
            </div>


            <div className="space-y-2 py-5 text-sm text-foreground">
              <p>{address.fullName}</p>
              <p>{address.email}</p>
              <p>{address.phone}</p>
            </div>

            <h3 className="border-b border-border pb-4 text-xs font-bold uppercase tracking-wider text-foreground">
              DELIVERY ADDRESS
            </h3>

            <div className="space-y-2 py-5 text-sm text-foreground">
              <p>{address.streetAddress}</p>
              <p>
                {address.city}, {address.country}
              </p>

              {address.additionalDetails && (
                <p className="text-text-secondary">
                  {address.additionalDetails}
                </p>
              )}
            </div>

            <h3 className="border-b border-border pb-4 text-xs font-bold uppercase tracking-wider text-foreground">
              DELIVERY & PAYMENT
            </h3>

            <div className="space-y-2 py-5 text-sm text-foreground">
              <p>Standard Delivery</p>
              <p>Cash on Delivery</p>
            </div>

            <p className="border-l-2 border-accent bg-image-sand p-4 text-sm leading-6 text-text-secondary">
              Checkout preview only. No order has been
              placed or payment processed.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 border border-border px-6 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-accent"
          >
            ← BACK TO PAYMENT
          </button>
        </section>
      )}
    </div>
  );
}
