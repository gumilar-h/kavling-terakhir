"use client";

import { useMemo, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { burialSites } from "@/lib/burial-sites";
import {
  BUYING_INTENT_OPTIONS,
  filterBurialSites,
  PLOT_TYPE_OPTIONS,
  RELIGION_OPTIONS,
} from "@/lib/filters";
import {
  DEFAULT_FILTER_STATE,
  type BurialSite,
  type FilterState,
} from "@/types/burial-site";
import ComparisonTable from "./ComparisonTable";
import PriceRangeSlider from "./PriceRangeSlider";
import SiteCard from "./SiteCard";

const MAX_COMPARE = 3;

interface FilterCompareViewProps {
  onSiteSelect: (site: BurialSite) => void;
}

const FilterChip = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
      isActive
        ? "border-brand-emerald bg-brand-emerald text-white shadow-sm"
        : "border-neutral-muted bg-white text-brand-emerald hover:border-brand-emerald/30"
    }`}
  >
    {label}
  </button>
);

const FilterCompareView = ({ onSiteSelect }: FilterCompareViewProps) => {
  const { searchQuery } = useSearch();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const filteredSites = useMemo(
    () => filterBurialSites(burialSites, filters, searchQuery),
    [filters, searchQuery],
  );

  const compareSites = useMemo(
    () =>
      compareIds
        .map((id) => burialSites.find((s) => s.id === id))
        .filter((s): s is BurialSite => s !== undefined),
    [compareIds],
  );

  const toggleFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const handleCheckChange = (siteId: string, checked: boolean) => {
    setCompareIds((prev) => {
      if (checked) {
        if (prev.length >= MAX_COMPARE) return prev;
        return [...prev, siteId];
      }
      return prev.filter((id) => id !== siteId);
    });
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Filter 1: Religion */}
      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-dark/70">
          Agama
        </h2>
        <div className="flex flex-wrap gap-2">
          {RELIGION_OPTIONS.map((religion) => (
            <FilterChip
              key={religion}
              label={religion}
              isActive={filters.religion === religion}
              onClick={() => toggleFilter("religion", religion)}
            />
          ))}
        </div>
      </section>

      {/* Filter 2: Price Range Slider */}
      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-dark/70">
          Rentang Harga
        </h2>
        <PriceRangeSlider
          min={filters.priceMin}
          max={filters.priceMax}
          onChange={(priceMin, priceMax) =>
            setFilters((prev) => ({ ...prev, priceMin, priceMax }))
          }
        />
      </section>

      {/* Filter 3: Buying Intent */}
      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-dark/70">
          Kondisi Pembelian
        </h2>
        <div className="flex flex-wrap gap-2">
          {BUYING_INTENT_OPTIONS.map(({ value, label }) => (
            <FilterChip
              key={value}
              label={label}
              isActive={filters.buyingIntent === value}
              onClick={() => toggleFilter("buyingIntent", value)}
            />
          ))}
        </div>
      </section>

      {/* Filter 4: Plot Type */}
      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-dark/70">
          Tipe Kavling
        </h2>
        <div className="flex flex-wrap gap-2">
          {PLOT_TYPE_OPTIONS.map((plotType) => (
            <FilterChip
              key={plotType}
              label={plotType}
              isActive={filters.plotType === plotType}
              onClick={() => toggleFilter("plotType", plotType)}
            />
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      {compareSites.length > 0 && (
        <ComparisonTable sites={compareSites} />
      )}

      {/* Results */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-dark">
            Hasil ({filteredSites.length})
          </h2>
          <p className="text-xs font-medium text-neutral-dark/70">
            Pilih max {MAX_COMPARE} untuk bandingkan
          </p>
        </div>

        {filteredSites.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-muted bg-white py-10 text-center shadow-sm">
            <p className="text-sm font-medium text-neutral-dark">
              Tidak ada pemakaman yang cocok.
            </p>
            <p className="mt-1 text-xs font-medium text-neutral-dark/70">
              Coba ubah filter atau kata kunci pencarian.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                onSelect={onSiteSelect}
                showCheckbox
                isChecked={compareIds.includes(site.id)}
                onCheckChange={handleCheckChange}
                checkDisabled={
                  !compareIds.includes(site.id) &&
                  compareIds.length >= MAX_COMPARE
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FilterCompareView;
