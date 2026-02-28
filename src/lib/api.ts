import { fiches as mockFiches, conseillers } from "@/data/mock";
import type {
  Fiche,
  FicheFilters,
  FicheStatus,
  PaginatedResult,
  Conseiller,
  User,
} from "@/types";

// Simulated network delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// In-memory mutable copy for updates
let fichesStore: Fiche[] = JSON.parse(JSON.stringify(mockFiches));

// ─── Fiches ──────────────────────────────────────────────────

export async function fetchFiches(
  filters: FicheFilters,
  currentUser: User
): Promise<PaginatedResult<Fiche>> {
  await delay(400 + Math.random() * 300);

  let result = [...fichesStore];

  // Role-based filtering
  if (currentUser.role === "ADVISOR" && currentUser.conseillerId) {
    result = result.filter(
      (f) => f.conseiller?.id === currentUser.conseillerId || f.conseiller === null
    );
  }

  // Filters
  if (filters.produit) {
    result = result.filter((f) => f.produit.type === filters.produit);
  }
  if (filters.statut) {
    result = result.filter((f) => f.statut === filters.statut);
  }
  if (filters.search) {
    const search = filters.search.toLowerCase();
    result = result.filter(
      (f) =>
        f.client.nom.toLowerCase().includes(search) ||
        f.client.prenom.toLowerCase().includes(search) ||
        `${f.client.prenom} ${f.client.nom}`.toLowerCase().includes(search)
    );
  }

  // Sort by date descending
  result.sort(
    (a, b) =>
      new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
  );

  const total = result.length;
  const totalPages = Math.ceil(total / filters.pageSize);
  const start = (filters.page - 1) * filters.pageSize;
  const data = result.slice(start, start + filters.pageSize);

  return { data, total, page: filters.page, pageSize: filters.pageSize, totalPages };
}

export async function fetchFicheById(id: string): Promise<Fiche | null> {
  await delay(300 + Math.random() * 200);
  return fichesStore.find((f) => f.id === id) ?? null;
}

export async function updateFicheStatus(
  id: string,
  statut: FicheStatus
): Promise<Fiche> {
  await delay(300);
  const fiche = fichesStore.find((f) => f.id === id);
  if (!fiche) throw new Error("Fiche introuvable");
  fiche.statut = statut;
  return { ...fiche };
}

export async function assignFiche(
  id: string,
  conseillerId: string
): Promise<Fiche> {
  await delay(300);
  const fiche = fichesStore.find((f) => f.id === id);
  if (!fiche) throw new Error("Fiche introuvable");
  const conseiller = conseillers.find((c) => c.id === conseillerId);
  if (!conseiller) throw new Error("Conseiller introuvable");
  fiche.conseiller = conseiller;
  if (fiche.statut === "NEW") fiche.statut = "ASSIGNED";
  return { ...fiche };
}

// ─── Conseillers ─────────────────────────────────────────────

export async function fetchConseillers(): Promise<Conseiller[]> {
  await delay(200);
  return [...conseillers];
}
