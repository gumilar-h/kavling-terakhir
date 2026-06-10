interface WhatsAppLinkParams {
  phoneNumber: string;
  burialSiteName: string;
}

/**
 * Builds a WhatsApp deep-link with a pre-filled, URL-encoded message.
 * Uses strict native encodeURIComponent for safe text encoding.
 */
export const buildWhatsAppLink = ({
  phoneNumber,
  burialSiteName,
}: WhatsAppLinkParams): string => {
  const message = `Halo, saya ingin bertanya tentang ${burialSiteName}.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
