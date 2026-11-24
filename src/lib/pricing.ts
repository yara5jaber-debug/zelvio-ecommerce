
export const FREE_SHIPPING_THRESHOLD = 100;

export const PROMO_CODE = "SAVE10";

export const DISCOUNT_RATE = 0.1;

export type PriceItem = {
  price: number;
  quantity: number;
};

export type PriceSummary = {
  subtotal: number;
  discount: number;
  totalBeforeShipping: number;
  freeShippingEligible: boolean;
  remainingForFreeShipping: number;
};

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculatePriceSummary(
  items: PriceItem[],
  promoCode?: string | null
): PriceSummary {
  const subtotal = roundMoney(
    items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    )
  );

  const normalizedCode = promoCode
    ?.trim()
    .toUpperCase();

  const hasValidPromo =
    normalizedCode === PROMO_CODE;

  const discount = hasValidPromo
    ? roundMoney(subtotal * DISCOUNT_RATE)
    : 0;

  const totalBeforeShipping = roundMoney(
    Math.max(0, subtotal - discount)
  );

  const freeShippingEligible =
    subtotal >= FREE_SHIPPING_THRESHOLD;

  const remainingForFreeShipping = roundMoney(
    Math.max(
      0,
      FREE_SHIPPING_THRESHOLD - subtotal
    )
  );

  return {
    subtotal,
    discount,
    totalBeforeShipping,
    freeShippingEligible,
    remainingForFreeShipping,
  };
}
