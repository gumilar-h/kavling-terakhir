import type {
  BurialSite,
  BuyingIntent,
  FilterState,
  PlotType,
  Religion,
} from "@/types/burial-site";

export { PRICE_FILTER_MAX, PRICE_FILTER_MIN } from "@/types/burial-site";

const matchesPriceBounds = (
  price: number,
  min: number,
  max: number,
): boolean => price >= min && price <= max;

const matchesBuyingIntent = (
  booking: BurialSite["booking"],
  intent: BuyingIntent,
): boolean => {
  if (intent === "pre-need") {
    return booking === "Pre-Need & At-Need" || booking === "Pre-Need Only";
  }
  return booking === "Pre-Need & At-Need" || booking === "At-Need Only";
};

const matchesSearch = (site: BurialSite, query: string): boolean => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    site.name,
    site.religion,
    site.address,
    site.dimensions,
    ...site.plotTypes,
    ...site.facilities,
    ...site.plotOptions.flatMap((option) => [
      option.plotType,
      ...option.features,
    ]),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
};

/** Apply home-view filters plus global search query */
export const filterBurialSites = (
  sites: readonly BurialSite[],
  filters: FilterState,
  searchQuery: string,
): BurialSite[] => {
  return sites.filter((site) => {
    if (filters.religion && site.religion !== filters.religion) return false;
    if (
      !matchesPriceBounds(site.price, filters.priceMin, filters.priceMax)
    ) {
      return false;
    }
    if (
      filters.buyingIntent &&
      !matchesBuyingIntent(site.booking, filters.buyingIntent)
    ) {
      return false;
    }
    if (
      filters.plotType &&
      !site.plotTypes.includes(filters.plotType as PlotType)
    ) {
      return false;
    }
    if (!matchesSearch(site, searchQuery)) return false;
    return true;
  });
};

/** Search-only filter for the alphabetical directory */
export const filterBySearch = (
  sites: readonly BurialSite[],
  searchQuery: string,
): BurialSite[] => {
  return sites.filter((site) => matchesSearch(site, searchQuery));
};

/** Group sites alphabetically by first letter of name */
export const groupByLetter = (
  sites: BurialSite[],
): Record<string, BurialSite[]> => {
  const sorted = [...sites].sort((a, b) =>
    a.name.localeCompare(b.name, "id"),
  );

  return sorted.reduce<Record<string, BurialSite[]>>((groups, site) => {
    const letter = site.name.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(site);
    return groups;
  }, {});
};

/** Check if a site supports Pre-Need booking */
export const supportsPreNeed = (booking: BurialSite["booking"]): boolean =>
  booking === "Pre-Need & At-Need" || booking === "Pre-Need Only";

export const RELIGION_OPTIONS: Religion[] = [
  "Islam",
  "Christian",
  "Catholic",
  "Buddhist",
  "Universal",
];

export const BUYING_INTENT_OPTIONS: {
  value: BuyingIntent;
  label: string;
}[] = [
  { value: "pre-need", label: "Pre-Need" },
  { value: "at-need", label: "At-Need" },
];

export const PLOT_TYPE_OPTIONS: PlotType[] = ["Single", "Double", "Family"];
