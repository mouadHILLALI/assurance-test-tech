import { productLabels, productIcons } from "@/lib/utils";
import type { ProductType } from "@/types";

export function ProductBadge({ type }: { type: ProductType }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-semibold text-brand-700 tracking-wide">
      <span className="text-sm">{productIcons[type]}</span>
      {productLabels[type]}
    </span>
  );
}
