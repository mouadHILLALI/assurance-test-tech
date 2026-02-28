import { clsx, type ClassValue } from "clsx";
import type { FicheStatus, ProductType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export const statusConfig: Record<
  FicheStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  NEW: {
    label: "Nouveau",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
  },
  ASSIGNED: {
    label: "Assigné",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    dot: "bg-blue-500",
  },
  IN_PROGRESS: {
    label: "En cours",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
  },
  CLOSED: {
    label: "Clôturé",
    color: "text-gray-600",
    bg: "bg-gray-100 border-gray-300",
    dot: "bg-gray-400",
  },
};

export const productLabels: Record<ProductType, string> = {
  AUTO: "Automobile",
  MRH: "Habitation",
  RCPRO: "RC Pro",
  SANTE: "Santé",
  VIE: "Vie",
  PREVOYANCE: "Prévoyance",
};

export const productIcons: Record<ProductType, string> = {
  AUTO: "🚗",
  MRH: "🏠",
  RCPRO: "💼",
  SANTE: "🏥",
  VIE: "🌱",
  PREVOYANCE: "🛡️",
};
