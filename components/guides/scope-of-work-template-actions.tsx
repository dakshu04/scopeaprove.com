"use client";

import { useState } from "react";
import { Check, Clipboard, Download } from "lucide-react";

export function ScopeOfWorkTemplateActions({ template }: { template: string }) {
  const [copied, setCopied] = useState(false);

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#176b55] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#125c49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-2"
        onClick={copyTemplate}
        type="button"
      >
        {copied ? <Check aria-hidden="true" className="size-4" /> : <Clipboard aria-hidden="true" className="size-4" />}
        {copied ? "Template copied" : "Copy template"}
      </button>
      <a
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#cdded6] bg-white px-4 py-2.5 text-sm font-semibold text-[#176b55] transition-colors hover:bg-[#f5faf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-2"
        download
        href="/freelance-scope-of-work-template.txt"
      >
        <Download aria-hidden="true" className="size-4" />
        Download .txt
      </a>
    </div>
  );
}
