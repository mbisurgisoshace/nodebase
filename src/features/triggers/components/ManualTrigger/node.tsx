import { memo } from "react";
import { MousePointerIcon } from "lucide-react";
import type { Node, NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../BaseExecutionNode";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const handleOpenSettings = () => {};

  return (
    <>
      <BaseTriggerNode
        {...props}
        id={props.id}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
