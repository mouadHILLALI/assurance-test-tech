"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/Modal";
import { statusConfig } from "@/lib/utils";
import type { FicheStatus } from "@/types";

const schema = z.object({
  statut: z.enum(["NEW", "ASSIGNED", "IN_PROGRESS", "CLOSED"]),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  currentStatus: FicheStatus;
  onSubmit: (statut: FicheStatus) => void;
  isLoading?: boolean;
}

export function ChangeStatusModal({
  open,
  onClose,
  currentStatus,
  onSubmit,
  isLoading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { statut: currentStatus },
  });

  return (
    <Modal open={open} onClose={onClose} title="Changer le statut">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data.statut as FicheStatus))}
        className="space-y-5"
      >
        <div className="space-y-2">
          {(Object.keys(statusConfig) as FicheStatus[]).map((key) => (
            <label
              key={key}
              className="flex items-center gap-3 rounded-xl border border-surface-200 p-3 cursor-pointer transition-all hover:border-brand-300 hover:bg-brand-50/50 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50"
            >
              <input
                type="radio"
                value={key}
                {...register("statut")}
                className="h-4 w-4 border-surface-300 text-brand-600 focus:ring-brand-500"
              />
              <span
                className={`h-2 w-2 rounded-full ${statusConfig[key].dot}`}
              />
              <span className="text-sm font-medium text-surface-700">
                {statusConfig[key].label}
              </span>
              {key === currentStatus && (
                <span className="ml-auto text-[11px] text-surface-400 font-medium">
                  Actuel
                </span>
              )}
            </label>
          ))}
          {errors.statut && (
            <p className="text-xs text-red-500">{errors.statut.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-surface-600 transition-all hover:bg-surface-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-lg disabled:opacity-60"
          >
            {isLoading ? "Mise à jour…" : "Confirmer"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
