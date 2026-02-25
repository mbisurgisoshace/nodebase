"use client";

import { memo } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AddNodeButton = memo(() => {
  return (
    <Button
      size={"icon"}
      onClick={() => {}}
      variant={"outline"}
      className="bg-background"
    >
      <PlusIcon />
    </Button>
  );
});

AddNodeButton.displayName = "AddNodeButton";
