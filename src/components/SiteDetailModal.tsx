"use client";

import { useEffect, useState } from "react";
import {
  ExternalLink,
  MapPin,
  MessageCircle,
  X,
} from "lucide-react";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { BurialSite, BuyingIntent, PlotType } from "@/types/burial-site";
import MediaGallery from "./MediaGallery";

interface SiteDetailModalProps {
  site: BurialSite | null;
  onClose: () => void;
}

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

const SiteDetailModal = ({ site, onClose }: SiteDetailModalProps) => {
  const [plotType, setPlotType] = useState<PlotType>("Single");
  const [buyingIntent, setBuyingIntent] = useState<BuyingIntent>("pre-need");

  useEffect(() => {
    if (site) {
      setPlotType(site.plotTypes[0]);
      setBuyingIntent(
        site.booking === "At-Need Only" ? "at-need" : "pre-need",
      );
    }
  }, [site]);

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
    plotType,
    buyingIntent,
  });

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
          <p className="mt-1 text-lg font-bold text-brand-emerald">
            {formatPrice(site.price)}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <DetailRow label="Agama" value={site.religion} />
            <DetailRow label="Ukuran Plot" value={site.dimensions} />
            <DetailRow label="Tipe Kavling" value={site.plotTypes.join(", ")} />
            <DetailRow label="Ketersediaan" value={site.booking} />

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

            <div className="flex items-start gap-2 text-sm font-medium text-neutral-dark">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-dark/60" />
              <span>{site.address}</span>
            </div>

            {/* WhatsApp options */}
            <div className="rounded-xl border border-neutral-muted bg-white p-3 shadow-sm">
              <p className="mb-2 text-xs font-bold text-neutral-dark">
                Opsi pesan WhatsApp
              </p>
              <div className="mb-2">
                <label className="mb-1 block text-xs font-semibold text-neutral-dark/70">
                  Tipe Kavling
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {site.plotTypes.map((type) => (
                    <OptionChip
                      key={type}
                      label={type}
                      isActive={plotType === type}
                      onClick={() => setPlotType(type)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-dark/70">
                  Kondisi
                </label>
                <div className="flex gap-1.5">
                  <OptionChip
                    label="Pre-Need"
                    isActive={buyingIntent === "pre-need"}
                    onClick={() => setBuyingIntent("pre-need")}
                  />
                  <OptionChip
                    label="At-Need"
                    isActive={buyingIntent === "at-need"}
                    onClick={() => setBuyingIntent("at-need")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 border-t border-neutral-muted/60 px-4 py-4">
          <a
            href="https://google.com"
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
