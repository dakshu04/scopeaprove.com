"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PrintApprovalRecordButton() {
  return (
    <Button className="print:hidden" onClick={() => window.print()} type="button">
      <Printer aria-hidden="true" />
      Print or save PDF
    </Button>
  );
}
