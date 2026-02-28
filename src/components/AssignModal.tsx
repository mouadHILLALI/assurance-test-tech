"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/Modal";
import { useConseillers } from "@/hooks/use-fiches";

const schema = z.object({
  conseillerId: z.string().min(1, "Veuillez sélectionner un conseiller"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  currentConseillerId?: string | null;
  onSubmit: (conseillerId: string) => void;
  isLoading?: boolean;
}

export function AssignModal({
  open,
  onClose,
  currentConseillerId,
  onSubmit,
  isLoading,
}: Props) {
  const { data: conseillers = [] } = useConseillers();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { conseillerId: currentConseillerId ?? "" },
  });

  return (
    <Modal open={open} onClose={onClose} title="Assigner un conseiller">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data.conseillerId))}
        className="space-y-5"
      >
        <div className="space-y-2">
          {conseillers.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-surface-200 p-3 cursor-pointer transition-all hover:border-brand-300 hover:bg-brand-50/50 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50"
            >
              <input
                type="radio"
                value={c.id}
                {...register("conseillerId")}
                className="h-4 w-4 border-surface-300 text-brand-600 focus:ring-brand-500"
              />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-display font-bold text-xs">
                {c.prenom[0]}
                {c.nom[0]}
              </div>
              <span className="text-sm font-medium text-surface-700">
                {c.prenom} {c.nom}
              </span>
              {c.id === currentConseillerId && (
                <span className="ml-auto text-[11px] text-surface-400 font-medium">
                  Actuel
                </span>
              )}
            </label>
          ))}
          {errors.conseillerId && (
            <p className="text-xs text-red-500">
              {errors.conseillerId.message}
            </p>
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
            {isLoading ? "Assignation…" : "Assigner"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
