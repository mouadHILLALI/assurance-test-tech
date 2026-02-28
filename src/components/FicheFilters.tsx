"use client";

import { productLabels, statusConfig } from "@/lib/utils";
import type { ProductType, FicheStatus } from "@/types";

interface FiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  produit: ProductType | "";
  onProduitChange: (v: ProductType | "") => void;
  statut: FicheStatus | "";
  onStatutChange: (v: FicheStatus | "") => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function Filters({
  search,
  onSearchChange,
  produit,
  onProduitChange,
  statut,
  onStatutChange,
  onReset,
  hasActiveFilters,
}: FiltersProps) {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Rechercher par nom client…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-surface-200 bg-surface-50 py-2.5 pl-10 pr-4 text-sm text-surface-700 placeholder:text-surface-400 outline-none transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </div>

        {/* Product filter */}
        <select
          value={produit}
          onChange={(e) => onProduitChange(e.target.value as ProductType | "")}
          className="rounded-xl border border-surface-200 bg-surface-50 px-3 py-2.5 text-sm text-surface-700 outline-none transition-all hover:border-surface-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 min-w-[150px]"
        >
          <option value="">Tous les produits</option>
          {(Object.keys(productLabels) as ProductType[]).map((key) => (
            <option key={key} value={key}>
              {productLabels[key]}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={statut}
          onChange={(e) => onStatutChange(e.target.value as FicheStatus | "")}
          className="rounded-xl border border-surface-200 bg-surface-50 px-3 py-2.5 text-sm text-surface-700 outline-none transition-all hover:border-surface-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 min-w-[150px]"
        >
          <option value="">Tous les statuts</option>
          {(Object.keys(statusConfig) as FicheStatus[]).map((key) => (
            <option key={key} value={key}>
              {statusConfig[key].label}
            </option>
          ))}
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-100 hover:border-red-300 animate-fade-in shrink-0"
          >
            Effacer
          </button>
        )}
      </div>
    </div>
  );
}
