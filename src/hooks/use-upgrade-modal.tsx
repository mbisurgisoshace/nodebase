import { useState } from "react";
import { TRPCClientError } from "@trpc/client";

import { UpgradeModal } from "@/components/UpgradeModal";

export const useUpgradeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === "FORBIDDEN") {
        setIsOpen(true);
        return true;
      }
    }

    return false;
  };

  const modal = <UpgradeModal open={isOpen} onOpenChange={setIsOpen} />;

  return { handleError, modal };
};
