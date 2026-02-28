"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFiches } from "@/hooks/use-fiches";
import { useAuth } from "@/lib/auth-context";
import { Filters } from "@/components/FicheFilters";
import { FicheTable } from "@/components/FicheTable";
import { Pagination } from "@/components/ui/Pagination";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import type { ProductType, FicheStatus } from "@/types";

const PAGE_SIZE = 10;

export default function HomePage() {
  const { currentUser } = useAuth();
  const searchParams = useSearchParams();

  // Filter state
  const [search, setSearch] = useState("");
  const [produit, setProduit] = useState<ProductType | "">("");
  const [statut, setStatut] = useState<FicheStatus | "">("");
  const [page, setPage] = useState(1);

  // Sync produit from URL query param (e.g. from /produits page)
  useEffect(() => {
    const urlProduit = searchParams.get("produit") as ProductType | null;
    if (urlProduit) setProduit(urlProduit);
  }, [searchParams]);

  const filters = useMemo(
    () => ({
      search: search.trim() || undefined,
      produit: produit || undefined,
      statut: statut || undefined,
      page,
      pageSize: PAGE_SIZE,
    }),
    [search, produit, statut, page]
  );

  const { data, isLoading, isFetching } = useFiches(filters);

  const hasActiveFilters = !!(search || produit || statut);

  const resetFilters = useCallback(() => {
    setSearch("");
    setProduit("");
    setStatut("");
    setPage(1);
  }, []);

  // Reset page when filters change
  const handleSearchChange = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const handleProduitChange = (v: ProductType | "") => {
    setProduit(v);
    setPage(1);
  };
  const handleStatutChange = (v: FicheStatus | "") => {
    setStatut(v);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-surface-800 sm:text-3xl">
          Fiches d&apos;assurance
        </h1>
        <p className="mt-1 text-sm text-surface-400">
          {currentUser.role === "ADMIN"
            ? "Vue administrateur — toutes les fiches"
            : `Vue conseiller — ${currentUser.prenom} ${currentUser.nom}`}
          {data && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-surface-100 px-2 py-0.5 text-xs font-medium text-surface-500">
              {data.total} fiche{data.total > 1 ? "s" : ""}
            </span>
          )}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-5">
        <Filters
          search={search}
          onSearchChange={handleSearchChange}
          produit={produit}
          onProduitChange={handleProduitChange}
          statut={statut}
          onStatutChange={handleStatutChange}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Content */}
      <div className={`transition-opacity duration-200 ${isFetching && !isLoading ? "opacity-60" : ""}`}>
        {isLoading ? (
          <TableSkeleton rows={PAGE_SIZE} />
        ) : data && data.data.length > 0 ? (
          <>
            <FicheTable fiches={data.data} />
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={setPage}
              total={data.total}
              pageSize={data.pageSize}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
