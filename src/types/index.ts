// ─── Enums & Literals ────────────────────────────────────────
export type ProductType = "AUTO" | "MRH" | "RCPRO" | "SANTE" | "VIE" | "PREVOYANCE";

export type FicheStatus = "NEW" | "ASSIGNED" | "IN_PROGRESS" | "CLOSED";

export type UserRole = "ADMIN" | "ADVISOR";

// ─── Entities ────────────────────────────────────────────────
export interface Client {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
}

export interface Produit {
  type: ProductType;
  garanties: string[];
  prime: number; // monthly premium in EUR
}

export interface Conseiller {
  id: string;
  nom: string;
  prenom: string;
}

export interface Fiche {
  id: string;
  client: Client;
  produit: Produit;
  statut: FicheStatus;
  conseiller: Conseiller | null;
  dateCreation: string; // ISO date
  notes?: string;
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  role: UserRole;
  conseillerId?: string; // links to Conseiller.id when role is ADVISOR
}

// ─── API Params ──────────────────────────────────────────────
export interface FicheFilters {
  produit?: ProductType;
  statut?: FicheStatus;
  search?: string;
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Forms ───────────────────────────────────────────────────
export interface ChangeStatusForm {
  statut: FicheStatus;
}

export interface AssignForm {
  conseillerId: string;
}
