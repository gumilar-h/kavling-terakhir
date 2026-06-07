"use client";

import { useMemo } from "react";
import { useSearch } from "@/context/SearchContext";
import { burialSites } from "@/lib/burial-sites";
import { filterBySearch, groupByLetter } from "@/lib/filters";
import type { BurialSite } from "@/types/burial-site";
import SiteCard from "./SiteCard";

interface AlphabeticalViewProps {
  onSiteSelect: (site: BurialSite) => void;
}

const AlphabeticalView = ({ onSiteSelect }: AlphabeticalViewProps) => {
  const { searchQuery } = useSearch();

  const grouped = useMemo(() => {
    const filtered = filterBySearch(burialSites, searchQuery);
    return groupByLetter(filtered);
  }, [searchQuery]);

  const letters = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b, "id"),
  );

  return (
    <div className="p-4">
      {letters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-muted bg-white py-10 text-center shadow-sm">
          <p className="text-sm font-medium text-neutral-dark">
            Tidak ada pemakaman ditemukan.
          </p>
          <p className="mt-1 text-xs font-medium text-neutral-dark/70">
            Coba kata kunci pencarian lain.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {letters.map((letter) => (
            <section key={letter}>
              <div className="sticky top-[108px] z-20 -mx-4 border-b border-neutral-muted bg-white/95 px-4 py-1.5 backdrop-blur-sm">
                <span className="text-sm font-bold text-brand-emerald">
                  {letter}
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {grouped[letter].map((site) => (
                  <SiteCard
                    key={site.id}
                    site={site}
                    onSelect={onSiteSelect}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlphabeticalView;
