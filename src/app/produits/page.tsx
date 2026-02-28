"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fiches as mockFiches } from "@/data/mock";
import { productLabels, productIcons, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import type { ProductType, Fiche } from "@/types";

interface ProductSummary {
  type: ProductType;
  label: string;
  icon: string;
  ficheCount: number;
  avgPrime: number;
  allGaranties: string[];
  statusBreakdown: Record<string, number>;
  fiches: Fiche[];
}

function buildProductSummaries(fiches: Fiche[]): ProductSummary[] {
  const map = new Map<ProductType, Fiche[]>();

  for (const f of fiches) {
    const list = map.get(f.produit.type) ?? [];
    list.push(f);
    map.set(f.produit.type, list);
  }

  const allTypes = Object.keys(productLabels) as ProductType[];

  return allTypes.map((type) => {
    const typeFiches = map.get(type) ?? [];
    const garantiesSet = new Set<string>();
    const statusBreakdown: Record<string, number> = {};
    let totalPrime = 0;

    for (const f of typeFiches) {
      totalPrime += f.produit.prime;
      f.produit.garanties.forEach((g) => garantiesSet.add(g));
      statusBreakdown[f.statut] = (statusBreakdown[f.statut] ?? 0) + 1;
    }

    return {
      type,
      label: productLabels[type],
      icon: productIcons[type],
      ficheCount: typeFiches.length,
      avgPrime: typeFiches.length > 0 ? totalPrime / typeFiches.length : 0,
      allGaranties: Array.from(garantiesSet).sort(),
      statusBreakdown,
      fiches: typeFiches,
    };
  });
}

async function fetchProductSummaries(): Promise<ProductSummary[]> {
  await new Promise((r) => setTimeout(r, 400));
  return buildProductSummaries(mockFiches);
}

export default function ProduitsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["produits-summary"],
    queryFn: fetchProductSummaries,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link
            href="/"
            className="text-surface-400 hover:text-brand-600 transition-colors"
          >
            Fiches
          </Link>
          <span className="text-surface-300">/</span>
          <span className="font-medium text-surface-600">Produits</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-surface-800 sm:text-3xl">
          Catalogue Produits
        </h1>
        <p className="mt-1 text-sm text-surface-400">
          Vue d&apos;ensemble de tous les types de produits d&apos;assurance et
          leurs statistiques.
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product, i) => (
            <ProductCard key={product.type} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: ProductSummary;
  index: number;
}) {
  const cardColors: Record<ProductType, { gradient: string; badge: string }> = {
    AUTO: {
      gradient: "from-blue-50 to-white border-blue-200",
      badge: "bg-blue-100 text-blue-700",
    },
    MRH: {
      gradient: "from-amber-50 to-white border-amber-200",
      badge: "bg-amber-100 text-amber-700",
    },
    RCPRO: {
      gradient: "from-violet-50 to-white border-violet-200",
      badge: "bg-violet-100 text-violet-700",
    },
    SANTE: {
      gradient: "from-rose-50 to-white border-rose-200",
      badge: "bg-rose-100 text-rose-700",
    },
    VIE: {
      gradient: "from-emerald-50 to-white border-emerald-200",
      badge: "bg-emerald-100 text-emerald-700",
    },
    PREVOYANCE: {
      gradient: "from-teal-50 to-white border-teal-200",
      badge: "bg-teal-100 text-teal-700",
    },
  };

  const colors = cardColors[product.type];

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br ${colors.gradient} p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 animate-slide-up`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${colors.badge}`}
          >
            {product.icon}
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-surface-800">
              {product.label}
            </h2>
            <p className="text-xs text-surface-400 font-medium">
              {product.type}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${colors.badge}`}
        >
          {product.ficheCount} fiche{product.ficheCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl bg-white/70 border border-white p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-surface-400 mb-0.5">
            Prime moyenne
          </p>
          <p className="font-display text-lg font-bold text-surface-800">
            {product.ficheCount > 0
              ? formatCurrency(product.avgPrime)
              : "—"}
          </p>
          <p className="text-[11px] text-surface-400">par mois</p>
        </div>
        <div className="rounded-xl bg-white/70 border border-white p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-surface-400 mb-0.5">
            Garanties
          </p>
          <p className="font-display text-lg font-bold text-surface-800">
            {product.allGaranties.length}
          </p>
          <p className="text-[11px] text-surface-400">disponibles</p>
        </div>
      </div>

      {/* Status breakdown */}
      {product.ficheCount > 0 && (
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-surface-400 mb-2">
            Répartition par statut
          </p>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(product.statusBreakdown).map(([status, count]) => (
              <div key={status} className="flex items-center gap-1">
                <StatusBadge status={status as any} />
                <span className="text-xs font-bold text-surface-500">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Garanties */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-surface-400 mb-2">
          Garanties proposées
        </p>
        <div className="flex flex-wrap gap-1.5">
          {product.allGaranties.slice(0, 5).map((g) => (
            <span
              key={g}
              className="rounded-md border border-surface-200 bg-white px-2 py-0.5 text-[11px] font-medium text-surface-600"
            >
              {g}
            </span>
          ))}
          {product.allGaranties.length > 5 && (
            <span className="rounded-md bg-surface-100 px-2 py-0.5 text-[11px] font-medium text-surface-400">
              +{product.allGaranties.length - 5}
            </span>
          )}
          {product.allGaranties.length === 0 && (
            <span className="text-xs italic text-surface-400">
              Aucune fiche enregistrée
            </span>
          )}
        </div>
      </div>

      {/* Link to filtered list */}
      <Link
        href={`/?produit=${product.type}`}
        className={`mt-5 flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all hover:shadow-sm ${colors.badge} border-current/20 hover:opacity-80`}
      >
        Voir les fiches
        <svg
          width="14"
          height="14"
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
    </div>
  );
}
