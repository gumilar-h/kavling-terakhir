"use client";

import { useState } from "react";
import type { BurialSite } from "@/types/burial-site";
import AlphabeticalView from "./AlphabeticalView";
import BottomNav, { type AppView } from "./BottomNav";
import FilterCompareView from "./FilterCompareView";
import Header from "./Header";
import SiteDetailModal from "./SiteDetailModal";

const AppShell = () => {
  const [activeView, setActiveView] = useState<AppView>("filter");
  const [selectedSite, setSelectedSite] = useState<BurialSite | null>(null);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <main className="flex-1 overflow-y-auto pb-2">
        {activeView === "filter" ? (
          <FilterCompareView onSiteSelect={setSelectedSite} />
        ) : (
          <AlphabeticalView onSiteSelect={setSelectedSite} />
        )}
      </main>

      <BottomNav activeView={activeView} onViewChange={setActiveView} />

      <SiteDetailModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
      />
    </div>
  );
};

export default AppShell;
