"use client";

import { ImageIcon } from "lucide-react";

interface ImageSlotProps {
  src?: string | null;
  alt: string;
  className?: string;
}

const ImageSlot = ({ src, alt, className = "" }: ImageSlotProps) => {
  if (src) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg border border-neutral-muted bg-white ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border border-dashed border-neutral-muted bg-white ${className}`}
      aria-label={`Slot foto: ${alt}`}
    >
      <ImageIcon className="h-5 w-5 text-neutral-dark/30" aria-hidden />
    </div>
  );
};

export default ImageSlot;
