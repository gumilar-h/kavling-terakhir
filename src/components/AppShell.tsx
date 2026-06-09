"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { BurialSite } from "@/types/burial-site";
import AlphabeticalView from "./AlphabeticalView";
import { type AppView } from "./BottomNav";
import FilterCompareView from "./FilterCompareView";
import MobileAppFrame from "./MobileAppFrame";
import SiteDetailModal from "./SiteDetailModal";

const AppShell = () => {
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState<AppView>("filter");
  const [selectedSite, setSelectedSite] = useState<BurialSite | null>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "directory") {
      setActiveView("directory");
    } else if (tab === "filter") {
      setActiveView("filter");
    }
  }, [searchParams]);

  return (
    <MobileAppFrame activeView={activeView} onViewChange={setActiveView}>
      {activeView === "filter" ? (
        <FilterCompareView onSiteSelect={setSelectedSite} />
      ) : (
        <AlphabeticalView onSiteSelect={setSelectedSite} />
      )}

      <SiteDetailModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
      />
    </MobileAppFrame>
  );
};

export default AppShell;
