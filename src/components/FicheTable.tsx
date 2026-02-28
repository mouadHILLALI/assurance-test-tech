"use client";

import Link from "next/link";
import type { Fiche } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { formatDate } from "@/lib/utils";

interface FicheTableProps {
  fiches: Fiche[];
}

export function FicheTable({ fiches }: FicheTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 bg-surface-50">
              <th className="px-5 py-3.5 text-left font-semibold text-surface-500 text-xs uppercase tracking-wider">
                Client
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-surface-500 text-xs uppercase tracking-wider">
                Produit
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-surface-500 text-xs uppercase tracking-wider">
                Statut
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-surface-500 text-xs uppercase tracking-wider">
                Conseiller
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-surface-500 text-xs uppercase tracking-wider">
                Créé le
              </th>
              <th className="px-5 py-3.5 text-right font-semibold text-surface-500 text-xs uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {fiches.map((fiche, i) => (
              <tr
                key={fiche.id}
                className="group transition-colors hover:bg-brand-50/40 animate-slide-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-display font-bold text-xs">
                      {fiche.client.prenom[0]}
                      {fiche.client.nom[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-surface-800">
                        {fiche.client.prenom} {fiche.client.nom}
                      </p>
                      <p className="text-xs text-surface-400">
                        {fiche.client.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <ProductBadge type={fiche.produit.type} />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={fiche.statut} />
                </td>
                <td className="px-5 py-4 text-surface-600">
                  {fiche.conseiller ? (
                    <span>
                      {fiche.conseiller.prenom} {fiche.conseiller.nom}
                    </span>
                  ) : (
                    <span className="italic text-surface-400">Non assigné</span>
                  )}
                </td>
                <td className="px-5 py-4 text-surface-500 tabular-nums">
                  {formatDate(fiche.dateCreation)}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/fiche/${fiche.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-all hover:bg-brand-100 hover:border-brand-300 hover:shadow-sm group-hover:bg-brand-100"
                  >
                    Voir
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-surface-100">
        {fiches.map((fiche, i) => (
          <Link
            key={fiche.id}
            href={`/fiche/${fiche.id}`}
            className="flex items-center gap-3 p-4 transition-colors hover:bg-brand-50/40 animate-slide-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-display font-bold text-xs shrink-0">
              {fiche.client.prenom[0]}
              {fiche.client.nom[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-surface-800 text-sm truncate">
                {fiche.client.prenom} {fiche.client.nom}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <ProductBadge type={fiche.produit.type} />
                <StatusBadge status={fiche.statut} />
              </div>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-surface-400"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
