
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const shippingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name."),

  email: z
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .refine(
      (value) => /^[+()\d\s-]+$/.test(value),
      "Use numbers and valid phone symbols only."
    ),

  country: z
    .string()
    .trim()
    .min(2, "Please enter your country."),

  city: z
    .string()
    .trim()
    .min(2, "Please enter your city."),

  streetAddress: z
    .string()
    .trim()
    .min(5, "Please enter your street address."),

  additionalDetails: z.string().optional(),
});

export type ShippingAddressValues = z.infer<
  typeof shippingSchema
>;

type ShippingAddressFormProps = {
  onContinue?: (values: ShippingAddressValues) => void;
};

const inputClass =
  "min-h-12 w-full rounded-[2px] border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-text-secondary/60 focus:border-foreground focus-visible:ring-1 focus-visible:ring-foreground";

const labelClass =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-foreground";

export default function ShippingAddressForm({
  onContinue,
}: ShippingAddressFormProps) {
  const [validated, setValidated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddressValues>({
    resolver: zodResolver(shippingSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      streetAddress: "",
      additionalDetails: "",
    },
  });

  function onSubmit(values: ShippingAddressValues) {
    if (onContinue) {
      onContinue(values);
      return;
    }

    setValidated(true);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setValidated(false)}
      noValidate
      className="mt-8 space-y-8"
    >
      <div className="border-b border-border pb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
          CONTACT INFORMATION
        </p>

        <p className="mt-2 text-sm leading-6 text-text-secondary">
          We&apos;ll use these details for your delivery.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className={labelClass}>
            FULL NAME *
          </label>

          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            aria-invalid={!!errors.fullName}
            aria-describedby={
              errors.fullName ? "fullName-error" : undefined
            }
            className={inputClass}
            {...register("fullName")}
          />

          {errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              className="mt-2 text-xs text-sale-price"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            EMAIL ADDRESS *
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={
              errors.email ? "email-error" : undefined
            }
            className={inputClass}
            {...register("email")}
          />

          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-2 text-xs text-sale-price"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            PHONE NUMBER *
          </label>

          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+970 59 ..."
            aria-invalid={!!errors.phone}
            aria-describedby={
              errors.phone ? "phone-error" : undefined
            }
            className={inputClass}
            {...register("phone")}
          />

          {errors.phone && (
            <p
              id="phone-error"
              role="alert"
              className="mt-2 text-xs text-sale-price"
            >
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="border-b border-border pb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
          DELIVERY ADDRESS
        </p>

        <p className="mt-2 text-sm leading-6 text-text-secondary">
          Where should we deliver your order?
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className={labelClass}>
            COUNTRY *
          </label>

          <input
            id="country"
            type="text"
            autoComplete="country-name"
            placeholder="Country"
            aria-invalid={!!errors.country}
            aria-describedby={
              errors.country ? "country-error" : undefined
            }
            className={inputClass}
            {...register("country")}
          />

          {errors.country && (
            <p
              id="country-error"
              role="alert"
              className="mt-2 text-xs text-sale-price"
            >
              {errors.country.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="city" className={labelClass}>
            CITY *
          </label>

          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            placeholder="City"
            aria-invalid={!!errors.city}
            aria-describedby={
              errors.city ? "city-error" : undefined
            }
            className={inputClass}
            {...register("city")}
          />

          {errors.city && (
            <p
              id="city-error"
              role="alert"
              className="mt-2 text-xs text-sale-price"
            >
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="streetAddress" className={labelClass}>
            STREET ADDRESS *
          </label>

          <input
            id="streetAddress"
            type="text"
            autoComplete="street-address"
            placeholder="Street, building number, apartment"
            aria-invalid={!!errors.streetAddress}
            aria-describedby={
              errors.streetAddress
                ? "streetAddress-error"
                : undefined
            }
            className={inputClass}
            {...register("streetAddress")}
          />

          {errors.streetAddress && (
            <p
              id="streetAddress-error"
              role="alert"
              className="mt-2 text-xs text-sale-price"
            >
              {errors.streetAddress.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="additionalDetails" className={labelClass}>
            ADDITIONAL DETAILS
            <span className="ml-2 font-normal normal-case tracking-normal text-text-secondary">
              Optional
            </span>
          </label>

          <textarea
            id="additionalDetails"
            rows={3}
            placeholder="Landmark or delivery instructions"
            className={`${inputClass} resize-y`}
            {...register("additionalDetails")}
          />
        </div>
      </div>

      <div className="border-t border-border pt-7">
        <p className="mb-5 text-xs leading-6 text-text-secondary">
          Fields marked with * are required.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-[2px] bg-foreground px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "VALIDATING..." : "CONTINUE"}
          <span aria-hidden="true">→</span>
        </button>

        {validated && (
          <p
            role="status"
            className="mt-4 border border-border p-4 text-sm leading-6 text-foreground"
          >
            Address details validated successfully.
            The next checkout step is not connected yet.
            No order has been placed.
          </p>
        )}

        <p className="mt-4 text-center text-xs leading-6 text-text-secondary">
          Checkout is currently a preview. No order or
          payment will be processed.
        </p>
      </div>
    </form>
  );
}
