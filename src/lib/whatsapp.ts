import type { BuyingIntent, PlotType } from "@/types/burial-site";

interface WhatsAppLinkParams {
  phoneNumber: string;
  burialSiteName: string;
  plotType: PlotType;
  buyingIntent: BuyingIntent;
}

const BUYING_INTENT_LABEL: Record<BuyingIntent, string> = {
  "pre-need": "Pre-Need",
  "at-need": "At-Need",
};

/**
 * Builds a WhatsApp deep-link with a pre-filled, URL-encoded message.
 * Uses strict native encodeURIComponent for safe text encoding.
 */
export const buildWhatsAppLink = ({
  phoneNumber,
  burialSiteName,
  plotType,
  buyingIntent,
}: WhatsAppLinkParams): string => {
  const intentLabel = BUYING_INTENT_LABEL[buyingIntent];
  const message = `Halo, saya ingin bertanya tentang kavling ${plotType} di ${burialSiteName} untuk kondisi ${intentLabel}.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
