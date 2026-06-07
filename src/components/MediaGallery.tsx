"use client";

import { ImageIcon } from "lucide-react";

const GALLERY_SLOT_COUNT = 4;

interface MediaGalleryProps {
  images?: string[];
  siteName: string;
}

const MediaGallery = ({ images = [], siteName }: MediaGalleryProps) => {
  const slots = Array.from({ length: GALLERY_SLOT_COUNT }, (_, index) =>
    images[index] ?? null,
  );

  return (
    <div className="border-b border-neutral-muted/60 bg-[#eff3ef]">
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
        {slots.map((src, index) =>
          src ? (
            <div
              key={`${siteName}-gallery-${index}`}
              className="h-36 w-52 shrink-0 overflow-hidden rounded-xl border border-neutral-muted bg-white shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${siteName} foto ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              key={`${siteName}-gallery-slot-${index}`}
              className="flex h-36 w-52 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-muted bg-white shadow-sm"
              aria-label={`Slot galeri ${index + 1}`}
            >
              <ImageIcon className="h-6 w-6 text-neutral-dark/30" aria-hidden />
              <span className="text-[10px] font-semibold text-neutral-dark/60">
                Foto {index + 1}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
