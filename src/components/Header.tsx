"use client";

import { Search, X } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import CTABanner from "./CTABanner";

const Header = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();

  return (
    <header className="sticky top-0 z-50 bg-[#eff3ef] pb-2 shadow-sm">
      {/* Top tier: persistent CTA banner */}
      <CTABanner />

      {/* Bottom tier: universal search bar */}
      <div className="px-4 pt-2">
        <div className="relative flex items-center">
          <Search
            className="pointer-events-none absolute left-3 h-4 w-4 text-neutral-dark/50"
            aria-hidden
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pemakaman..."
            className="w-full rounded-xl border border-neutral-muted bg-white py-2.5 pl-9 pr-10 text-sm font-medium text-neutral-dark placeholder:text-neutral-dark/50 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-brand-emerald/20"
            aria-label="Cari pemakaman"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full text-neutral-dark/60 transition-colors hover:bg-white hover:text-neutral-dark"
              aria-label="Hapus pencarian"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
