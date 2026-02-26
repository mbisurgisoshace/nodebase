import { memo, useState } from "react";
import type { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";

import { ManualTriggerDialog } from "./Dialog";
import { BaseTriggerNode } from "../BaseTriggerNode";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = "initial";

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        id={props.id}
        status={nodeStatus}
        icon={MousePointerIcon}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        name="When clicking 'Execute workflow'"
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
