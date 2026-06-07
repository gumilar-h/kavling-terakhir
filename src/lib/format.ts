/** Format a number as Indonesian Rupiah (e.g. Rp38.000.000) */
export const formatPrice = (price: number): string => {
  return `Rp${price.toLocaleString("id-ID")}`;
};

/** Short price label for compact UI */
export const formatPriceShort = (price: number): string => {
  if (price >= 1_000_000_000) {
    return `Rp${(price / 1_000_000_000).toFixed(1)}M`;
  }
  if (price >= 1_000_000) {
    return `Rp${(price / 1_000_000).toFixed(0)}Jt`;
  }
  if (price >= 1_000) {
    return `Rp${(price / 1_000).toFixed(0)}Rb`;
  }
  return formatPrice(price);
};
