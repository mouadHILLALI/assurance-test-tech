"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useFiche, useChangeStatus, useAssignFiche } from "@/hooks/use-fiches";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ChangeStatusModal } from "@/components/ChangeStatusModal";
import { AssignModal } from "@/components/AssignModal";
import {
  formatDate,
  formatCurrency,
  productLabels,
  productIcons,
} from "@/lib/utils";
import type { FicheStatus } from "@/types";

export default function FicheDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: fiche, isLoading } = useFiche(id);
  const changeStatus = useChangeStatus();
  const assignFiche = useAssignFiche();

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleStatusChange = (statut: FicheStatus) => {
    changeStatus.mutate(
      { id, statut },
      {
        onSuccess: () => setShowStatusModal(false),
      }
    );
  };

  const handleAssign = (conseillerId: string) => {
    assignFiche.mutate(
      { id, conseillerId },
      {
        onSuccess: () => setShowAssignModal(false),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!fiche) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <h2 className="font-display text-xl font-semibold text-surface-700">
          Fiche introuvable
        </h2>
        <p className="mt-2 text-sm text-surface-400">
          Cette fiche n&apos;existe pas ou a été supprimée.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 hover:bg-brand-700 transition-all"
        >
          ← Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-surface-400 hover:text-brand-600 transition-colors"
        >
          Fiches
        </Link>
        <span className="text-surface-300">/</span>
        <span className="font-medium text-surface-600">
          {fiche.client.prenom} {fiche.client.nom}
        </span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 font-display font-bold text-lg shadow-sm">
            {fiche.client.prenom[0]}
            {fiche.client.nom[0]}
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-surface-800 sm:text-2xl">
              {fiche.client.prenom} {fiche.client.nom}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status={fiche.statut} />
              <span className="text-xs text-surface-400">
                Créé le {formatDate(fiche.dateCreation)}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="self-start rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-surface-600 transition-all hover:bg-surface-50 hover:border-surface-300"
        >
          ← Retour
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client section */}
          <section className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm animate-slide-up">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-surface-800 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-600 text-sm">
                👤
              </span>
              Client
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Nom complet">
                {fiche.client.prenom} {fiche.client.nom}
              </InfoRow>
              <InfoRow label="Téléphone">
                <a
                  href={`tel:${fiche.client.telephone}`}
                  className="text-brand-600 hover:underline"
                >
                  {fiche.client.telephone}
                </a>
              </InfoRow>
              <InfoRow label="Email" span>
                <a
                  href={`mailto:${fiche.client.email}`}
                  className="text-brand-600 hover:underline"
                >
                  {fiche.client.email}
                </a>
              </InfoRow>
            </div>
          </section>

          {/* Product section */}
          <section
            className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm animate-slide-up"
            style={{ animationDelay: "80ms" }}
          >
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-surface-800 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600 text-sm">
                {productIcons[fiche.produit.type]}
              </span>
              Produit
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Type">
                <ProductBadge type={fiche.produit.type} />
              </InfoRow>
              <InfoRow label="Prime mensuelle">
                <span className="font-display font-bold text-surface-800 text-lg">
                  {formatCurrency(fiche.produit.prime)}
                </span>
              </InfoRow>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-2">
                  Garanties
                </p>
                <div className="flex flex-wrap gap-2">
                  {fiche.produit.garanties.map((g) => (
                    <span
                      key={g}
                      className="rounded-lg border border-surface-200 bg-surface-50 px-2.5 py-1 text-xs font-medium text-surface-600"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right column — Actions & Advisor */}
        <div className="space-y-6">
          {/* Advisor */}
          <section
            className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm animate-slide-in-right"
          >
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-surface-800 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-600 text-sm">
                🧑‍💼
              </span>
              Conseiller
            </h2>
            {fiche.conseiller ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-display font-bold text-xs">
                  {fiche.conseiller.prenom[0]}
                  {fiche.conseiller.nom[0]}
                </div>
                <div>
                  <p className="font-semibold text-surface-800 text-sm">
                    {fiche.conseiller.prenom} {fiche.conseiller.nom}
                  </p>
                  <p className="text-xs text-surface-400">Conseiller assigné</p>
                </div>
              </div>
            ) : (
              <p className="italic text-sm text-surface-400">
                Aucun conseiller assigné
              </p>
            )}
          </section>

          {/* Actions */}
          <section
            className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm animate-slide-in-right"
            style={{ animationDelay: "80ms" }}
          >
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-surface-800 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600 text-sm">
                ⚡
              </span>
              Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowStatusModal(true)}
                className="w-full rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-100 hover:border-brand-300 hover:shadow-sm flex items-center justify-center gap-2"
              >
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
                  <path d="M12 20h9" />
                  <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                </svg>
                Changer le statut
              </button>
              <button
                onClick={() => setShowAssignModal(true)}
                className="w-full rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-700 transition-all hover:bg-teal-100 hover:border-teal-300 hover:shadow-sm flex items-center justify-center gap-2"
              >
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
                Assigner un conseiller
              </button>
            </div>
          </section>

          {/* Quick Info */}
          <section
            className="rounded-2xl border border-surface-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm animate-slide-in-right"
            style={{ animationDelay: "160ms" }}
          >
            <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3">
              Résumé
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-surface-400">Réf.</dt>
                <dd className="font-mono font-medium text-surface-700 text-xs bg-surface-100 px-2 py-0.5 rounded">
                  {fiche.id}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-surface-400">Produit</dt>
                <dd className="font-medium text-surface-700">
                  {productLabels[fiche.produit.type]}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-surface-400">Prime</dt>
                <dd className="font-display font-bold text-surface-800">
                  {formatCurrency(fiche.produit.prime)}/mois
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-surface-400">Créé le</dt>
                <dd className="font-medium text-surface-700">
                  {formatDate(fiche.dateCreation)}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {/* Modals */}
      <ChangeStatusModal
        open={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        currentStatus={fiche.statut}
        onSubmit={handleStatusChange}
        isLoading={changeStatus.isPending}
      />
      <AssignModal
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        currentConseillerId={fiche.conseiller?.id}
        onSubmit={handleAssign}
        isLoading={assignFiche.isPending}
      />
    </div>
  );
}

function InfoRow({
  label,
  children,
  span = false,
}: {
  label: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-1">
        {label}
      </p>
      <div className="text-sm text-surface-700">{children}</div>
    </div>
  );
}
