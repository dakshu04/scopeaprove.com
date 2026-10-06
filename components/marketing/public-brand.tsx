import { FileCheck2 } from "lucide-react";

import { siteConfig } from "@/config/siteConfig";

export function PublicBrand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-[-0.02em]">
      <span
        className={`${compact ? "size-7" : "size-8"} grid place-items-center rounded-lg bg-[#176b55] text-white shadow-[0_5px_14px_rgba(23,107,85,0.18)]`}
      >
        <FileCheck2 aria-hidden="true" className="size-4" />
      </span>
      <span>{siteConfig.name}</span>
    </span>
  );
}
