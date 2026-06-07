"use client";

import { formatPrice } from "@/lib/format";
import {
  PRICE_FILTER_MAX,
  PRICE_FILTER_MIN,
} from "@/types/burial-site";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

const PriceRangeSlider = ({ min, max, onChange }: PriceRangeSliderProps) => {
  const range = PRICE_FILTER_MAX - PRICE_FILTER_MIN;
  const minPercent = ((min - PRICE_FILTER_MIN) / range) * 100;
  const maxPercent = ((max - PRICE_FILTER_MIN) / range) * 100;

  const handleMinChange = (value: number) => {
    onChange(Math.min(value, max), max);
  };

  const handleMaxChange = (value: number) => {
    onChange(min, Math.max(value, min));
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="rounded-lg border border-neutral-muted bg-white px-3 py-2 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-dark/70">
            Minimum
          </p>
          <p className="text-sm font-bold text-neutral-dark">
            {formatPrice(min)}
          </p>
        </div>
        <div className="h-px flex-1 bg-neutral-muted" aria-hidden />
        <div className="rounded-lg border border-neutral-muted bg-white px-3 py-2 text-right shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-dark/70">
            Maksimum
          </p>
          <p className="text-sm font-bold text-neutral-dark">
            {formatPrice(max)}
          </p>
        </div>
      </div>

      <div className="relative h-10">
        <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-neutral-muted/60" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand-emerald"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        <input
          type="range"
          min={PRICE_FILTER_MIN}
          max={PRICE_FILTER_MAX}
          step={100_000}
          value={min}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="price-range-input price-range-input-min absolute inset-x-0 top-0 z-20"
          aria-label="Harga minimum"
          aria-valuemin={PRICE_FILTER_MIN}
          aria-valuemax={PRICE_FILTER_MAX}
          aria-valuenow={min}
        />
        <input
          type="range"
          min={PRICE_FILTER_MIN}
          max={PRICE_FILTER_MAX}
          step={100_000}
          value={max}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="price-range-input price-range-input-max absolute inset-x-0 top-0 z-30"
          aria-label="Harga maksimum"
          aria-valuemin={PRICE_FILTER_MIN}
          aria-valuemax={PRICE_FILTER_MAX}
          aria-valuenow={max}
        />
      </div>

      <div className="mt-1 flex justify-between text-[10px] font-semibold text-neutral-dark/70">
        <span>{formatPrice(PRICE_FILTER_MIN)}</span>
        <span>{formatPrice(PRICE_FILTER_MAX)}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
