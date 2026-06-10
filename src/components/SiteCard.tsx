"use client";

import { ChevronRight, MapPin } from "lucide-react";
import type { BurialSite } from "@/types/burial-site";
import ImageSlot from "./ImageSlot";

interface SiteCardProps {
  site: BurialSite;
  onSelect: (site: BurialSite) => void;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onCheckChange?: (siteId: string, checked: boolean) => void;
  checkDisabled?: boolean;
}

const SiteCard = ({
  site,
  onSelect,
  showCheckbox = false,
  isChecked = false,
  onCheckChange,
  checkDisabled = false,
}: SiteCardProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-muted bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      {showCheckbox && (
        <input
          type="checkbox"
          checked={isChecked}
          disabled={checkDisabled}
          onChange={(e) => onCheckChange?.(site.id, e.target.checked)}
          className="h-4 w-4 shrink-0 rounded border-neutral-muted text-brand-emerald focus:ring-brand-emerald disabled:opacity-40"
          aria-label={`Bandingkan ${site.name}`}
        />
      )}

      <button
        type="button"
        onClick={() => onSelect(site)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-snug text-neutral-dark">
            {site.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-neutral-dark/80">
            {site.kecamatan}, {site.city}
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs font-medium text-neutral-dark/70">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{site.plotTypes.join(", ")}</span>
          </div>
        </div>

        <ImageSlot
          src={site.thumbnailUrl}
          alt={site.name}
          className="h-20 w-20"
        />

        <ChevronRight className="h-4 w-4 shrink-0 text-neutral-dark/40" />
      </button>
    </div>
  );
};

export default SiteCard;
