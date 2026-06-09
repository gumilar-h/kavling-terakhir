"use client";

import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export type AppView = "filter" | "directory";

interface BottomNavProps {
  activeView?: AppView;
  onViewChange?: (view: AppView) => void;
}

const BottomNav = ({ activeView, onViewChange }: BottomNavProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";

  const tabFromUrl = searchParams.get("tab");
  const resolvedView: AppView | null = isHome
    ? activeView ?? (tabFromUrl === "directory" ? "directory" : "filter")
    : null;

  const tabs: {
    id: AppView;
    label: string;
    icon: typeof LayoutGrid;
    href: string;
  }[] = [
    {
      id: "filter",
      label: "Filter & Bandingkan",
      icon: LayoutGrid,
      href: "/?tab=filter",
    },
    {
      id: "directory",
      label: "Daftar Pemakaman",
      icon: List,
      href: "/?tab=directory",
    },
  ];

  return (
    <nav
      className="sticky bottom-0 z-50 border-t border-neutral-muted/60 bg-[#eff3ef]/95 backdrop-blur-sm"
      aria-label="Navigasi utama"
    >
      <div className="flex gap-1 px-2 py-2">
        {tabs.map(({ id, label, icon: Icon, href }) => {
          const isActive = resolvedView === id;

          const className = `flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors ${
            isActive
              ? "bg-brand-emerald text-white shadow-sm"
              : "border border-neutral-muted bg-white text-brand-emerald hover:border-brand-emerald/30"
          }`;

          if (isHome && onViewChange) {
            return (
              <button
                key={id}
                type="button"
                onClick={() => onViewChange(id)}
                className={className}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="leading-tight">{label}</span>
              </button>
            );
          }

          return (
            <Link
              key={id}
              href={href}
              className={className}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="leading-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
