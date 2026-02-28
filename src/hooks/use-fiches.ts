import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFiches,
  fetchFicheById,
  updateFicheStatus,
  assignFiche,
  fetchConseillers,
} from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { FicheFilters, FicheStatus } from "@/types";

// ─── List ────────────────────────────────────────────────────

export function useFiches(filters: FicheFilters) {
  const { currentUser } = useAuth();

  return useQuery({
    queryKey: ["fiches", filters, currentUser.id],
    queryFn: () => fetchFiches(filters, currentUser),
    placeholderData: (prev) => prev, // keep previous data while loading
  });
}

// ─── Detail ──────────────────────────────────────────────────

export function useFiche(id: string) {
  return useQuery({
    queryKey: ["fiche", id],
    queryFn: () => fetchFicheById(id),
    enabled: !!id,
  });
}

// ─── Mutations ───────────────────────────────────────────────

export function useChangeStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, statut }: { id: string; statut: FicheStatus }) =>
      updateFicheStatus(id, statut),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["fiches"] });
      qc.setQueryData(["fiche", data.id], data);
    },
  });
}

export function useAssignFiche() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      conseillerId,
    }: {
      id: string;
      conseillerId: string;
    }) => assignFiche(id, conseillerId),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["fiches"] });
      qc.setQueryData(["fiche", data.id], data);
    },
  });
}

// ─── Conseillers ─────────────────────────────────────────────

export function useConseillers() {
  return useQuery({
    queryKey: ["conseillers"],
    queryFn: fetchConseillers,
  });
}
