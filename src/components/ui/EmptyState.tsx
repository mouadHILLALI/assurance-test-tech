export function EmptyState({
  title = "Aucune fiche trouvée",
  description = "Essayez de modifier vos filtres ou votre recherche.",
  icon,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-100 text-3xl">
        {icon ?? "📋"}
      </div>
      <h3 className="font-display text-lg font-semibold text-surface-700">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-surface-400">{description}</p>
    </div>
  );
}
