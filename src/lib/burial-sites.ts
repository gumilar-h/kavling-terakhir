import burialSitesData from "@/data/burial-sites.json";
import type { BurialSite } from "@/types/burial-site";

/** Typed, read-only access to the mock burial site dataset */
export const burialSites: readonly BurialSite[] =
  burialSitesData as BurialSite[];

/** Retrieve a single site by its unique ID */
export const getBurialSiteById = (id: string): BurialSite | undefined =>
  burialSites.find((site) => site.id === id);
