"use client";

import { formatPrice } from "@/lib/format";
import { supportsPreNeed } from "@/lib/filters";
import type { BurialSite } from "@/types/burial-site";

interface ComparisonTableProps {
  sites: BurialSite[];
}

const ROWS: { key: string; label: string; render: (site: BurialSite) => string }[] = [
  {
    key: "price",
    label: "Harga",
    render: (site) => formatPrice(site.price),
  },
  {
    key: "dimensions",
    label: "Ukuran Plot",
    render: (site) => site.dimensions,
  },
  {
    key: "religion",
    label: "Agama",
    render: (site) => site.religion,
  },
  {
    key: "pre-need",
    label: "Pre-Need",
    render: (site) => (supportsPreNeed(site.booking) ? "Tersedia" : "Tidak"),
  },
];

const ComparisonTable = ({ sites }: ComparisonTableProps) => {
  if (sites.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-muted bg-white shadow-sm">
      <div className="border-b border-neutral-muted bg-white px-3 py-2">
        <h3 className="text-xs font-bold uppercase tracking-wide text-brand-emerald">
          Perbandingan ({sites.length}/3)
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-sm">
          <thead>
            <tr className="border-b border-neutral-muted/40">
              <th className="sticky left-0 z-10 bg-white px-3 py-2 text-left text-xs font-bold text-neutral-dark/70">
                Atribut
              </th>
              {sites.map((site) => (
                <th
                  key={site.id}
                  className="max-w-[140px] px-3 py-2 text-left text-xs font-bold text-neutral-dark"
                >
                  <span className="line-clamp-2">{site.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className="border-b border-neutral-muted/30">
                <td className="sticky left-0 z-10 bg-white px-3 py-2.5 text-xs font-bold text-neutral-dark/70">
                  {row.label}
                </td>
                {sites.map((site) => (
                  <td
                    key={`${site.id}-${row.key}`}
                    className="px-3 py-2.5 text-xs font-medium text-neutral-dark"
                  >
                    {row.render(site)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
