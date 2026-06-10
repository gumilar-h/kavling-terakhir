/** Religion categories supported by burial sites */
export type Religion =
  | "Islam"
  | "Protestan"
  | "Katolik"
  | "Buddha"
  | "Konghucu";

/** Booking intent availability */
export type BookingType = "Pre-Need & At-Need" | "At-Need Only" | "Pre-Need Only";

/** Plot size categories */
export type PlotType = "Single" | "Double" | "Family";

/** Buying intent filter options */
export type BuyingIntent = "pre-need" | "at-need";

/** Geographic coordinates */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** A specific plot offering at a burial site */
export interface PlotOption {
  plotType: PlotType;
  startingPrice: number;
  booking: BookingType;
  features: string[];
}

/** Core burial site record */
export interface BurialSite {
  id: string;
  name: string;
  whatsapp: string;
  religion: Religion;
  price: number;
  booking: BookingType;
  plotTypes: PlotType[];
  plotOptions: PlotOption[];
  coordinates: Coordinates;
  dimensions: string;
  facilities: string[];
  kecamatan: string;
  city: string;
  address: string;
  thumbnailUrl?: string | null;
  images?: string[];
}

/** Filter state for the home comparison view */
export interface FilterState {
  religion: Religion | null;
  priceMin: number;
  priceMax: number;
  buyingIntent: BuyingIntent | null;
  plotType: PlotType | null;
}

/** Global price filter bounds (Rp0 – Rp150Jt) */
export const PRICE_FILTER_MIN = 0;
export const PRICE_FILTER_MAX = 150_000_000;

/** Default empty filter state */
export const DEFAULT_FILTER_STATE: FilterState = {
  religion: null,
  priceMin: PRICE_FILTER_MIN,
  priceMax: PRICE_FILTER_MAX,
  buyingIntent: null,
  plotType: null,
};
