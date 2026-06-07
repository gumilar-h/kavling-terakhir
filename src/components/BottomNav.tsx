"use client";

import { LayoutGrid, List } from "lucide-react";

export type AppView = "filter" | "directory";

interface BottomNavProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const BottomNav = ({ activeView, onViewChange }: BottomNavProps) => {
  const tabs: { id: AppView; label: string; icon: typeof LayoutGrid }[] = [
    { id: "filter", label: "Filter & Bandingkan", icon: LayoutGrid },
    { id: "directory", label: "Daftar Pemakaman", icon: List },
  ];

  return (
    <nav
      className="sticky bottom-0 z-50 border-t border-neutral-muted/60 bg-[#eff3ef]/95 backdrop-blur-sm"
      aria-label="Navigasi utama"
    >
      <div className="flex gap-1 px-2 py-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onViewChange(id)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-brand-emerald text-white shadow-sm"
                  : "border border-neutral-muted bg-white text-brand-emerald hover:border-brand-emerald/30"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
