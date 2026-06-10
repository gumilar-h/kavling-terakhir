import type { Coordinates } from "@/types/burial-site";

/** Opens Google Maps at the given coordinates, optionally labeled with a place name */
export const buildGoogleMapsLink = (
  coordinates: Coordinates,
  label?: string,
): string => {
  const { lat, lng } = coordinates;
  const query = label ? `${lat},${lng} (${label})` : `${lat},${lng}`;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};
