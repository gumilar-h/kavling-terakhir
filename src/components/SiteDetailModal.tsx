"use client";

import { useEffect, useState } from "react";
import {
  ExternalLink,
  MessageCircle,
  X,
} from "lucide-react";
import { formatPrice } from "@/lib/format";
import { supportsPreNeed } from "@/lib/filters";
import { buildGoogleMapsLink } from "@/lib/maps";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type {
  BookingType,
  BurialSite,
  BuyingIntent,
  PlotOption,
} from "@/types/burial-site";
import ImageSlot from "./ImageSlot";
import MediaGallery from "./MediaGallery";

interface SiteDetailModalProps {
  site: BurialSite | null;
  onClose: () => void;
}

const supportsAtNeed = (booking: BookingType): boolean =>
  booking === "Pre-Need & At-Need" || booking === "At-Need Only";

const getDefaultBuyingIntent = (booking: BookingType): BuyingIntent =>
  booking === "At-Need Only" ? "at-need" : "pre-need";

const getPlotPrice = (
  option: PlotOption,
  intent: BuyingIntent,
): number | undefined =>
  intent === "pre-need" ? option.preNeedPrice : option.atNeedPrice;

const OptionChip = ({
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
    className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
      isActive
        ? "border-brand-emerald bg-brand-emerald text-white shadow-sm"
        : "border-neutral-muted bg-white text-brand-emerald hover:border-brand-emerald/30"
    }`}
  >
    {label}
  </button>
);

const PlotOptionCard = ({ option }: { option: PlotOption }) => {
  const [buyingIntent, setBuyingIntent] = useState<BuyingIntent>(() =>
    getDefaultBuyingIntent(option.booking),
  );

  const showPreNeed = supportsPreNeed(option.booking);
  const showAtNeed = supportsAtNeed(option.booking);
  const activePrice = getPlotPrice(option, buyingIntent);

  return (
    <div className="rounded-xl border border-neutral-muted bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold text-neutral-dark">
              {option.plotType}
            </h3>
            {activePrice !== undefined && (
              <p className="shrink-0 text-sm font-bold text-brand-emerald">
                {formatPrice(activePrice)}
              </p>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {showPreNeed && (
              <OptionChip
                label="Pre-Need"
                isActive={buyingIntent === "pre-need"}
                onClick={() => setBuyingIntent("pre-need")}
              />
            )}
            {showAtNeed && (
              <OptionChip
                label="At-Need"
                isActive={buyingIntent === "at-need"}
                onClick={() => setBuyingIntent("at-need")}
              />
            )}
          </div>

          <ul className="mt-2.5 flex flex-col gap-1">
            {option.features.map((feature) => (
              <li
                key={feature}
                className="text-xs font-medium text-neutral-dark/80 before:mr-2 before:font-bold before:text-brand-emerald before:content-['•']"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <ImageSlot
          src={option.imageUrl}
          alt={`${option.plotType} plot`}
          className="h-24 w-24"
        />
      </div>
    </div>
  );
};

const SiteDetailModal = ({ site, onClose }: SiteDetailModalProps) => {
  useEffect(() => {
    if (!site) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [site, onClose]);

  if (!site) return null;

  const whatsappUrl = buildWhatsAppLink({
    phoneNumber: site.whatsapp,
    burialSiteName: site.name,
  });

  const googleMapsUrl = buildGoogleMapsLink(site.coordinates, site.name);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-neutral-dark/50 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-detail-title"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 flex max-h-[90dvh] w-full max-w-sm flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        {/* Media gallery */}
        <div className="relative shrink-0">
          <MediaGallery images={site.images} siteName={site.name} />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-dark/50 text-white backdrop-blur-sm transition-colors hover:bg-neutral-dark/70"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Header */}
        <div className="border-b border-neutral-muted/60 px-4 py-4">
          <h2
            id="site-detail-title"
            className="text-base font-bold leading-snug text-neutral-dark"
          >
            {site.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-neutral-dark/80">
            {site.kecamatan}, {site.city}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <DetailRow label="Agama" value={site.religions.join(", ")} />
            <DetailRow label="Ukuran Plot" value={site.dimensions} />

            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-dark/70">
                Fasilitas
              </p>
              <ul className="flex flex-col gap-1">
                {site.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="text-sm font-medium text-neutral-dark before:mr-2 before:font-bold before:text-brand-emerald before:content-['•']"
                  >
                    {facility}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-dark/70">
                Pilihan Kavling
              </p>
              <div className="flex flex-col gap-2">
                {site.plotOptions.map((option) => (
                  <PlotOptionCard key={option.plotType} option={option} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 border-t border-neutral-muted/60 px-4 py-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-muted bg-white py-3 text-sm font-semibold text-neutral-dark transition-colors hover:border-brand-emerald/30"
          >
            <ExternalLink className="h-4 w-4" />
            Buka di Google Maps
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-accent-whatsapp py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex items-baseline justify-between gap-4">
    <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-neutral-dark/70">
      {label}
    </span>
    <span className="text-right text-sm font-semibold text-neutral-dark">
      {value}
    </span>
  </div>
);

export default SiteDetailModal;
