"use client";

import { NeoButton } from "./NeoButton";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <NeoButton variant="primary" size="sm" onClick={() => window.print()} className="shadow-neo">
      <Printer className="mr-2 h-4 w-4" />
      PRINT_PDF
    </NeoButton>
  );
}

