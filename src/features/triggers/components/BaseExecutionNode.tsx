"use client";

import Image from "next/image";
import { memo, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { type NodeProps, Position } from "@xyflow/react";

import { WorkflowNode } from "@/components/WorkflowNode";
import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  // status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo(
  ({
    name,
    children,
    onSettings,
    icon: Icon,
    description,
    onDoubleClick,
  }: BaseTriggerNodeProps) => {
    const handleDelete = () => {};

    return (
      <WorkflowNode
        name={name}
        onSettings={onSettings}
        onDelete={handleDelete}
        description={description}
      >
        <BaseNode
          className="rounded-l-2xl relative group"
          onDoubleClick={onDoubleClick}
        >
          <BaseNodeContent>
            {typeof Icon === "string" ? (
              <Image src={Icon} alt={name} width={16} height={16} />
            ) : (
              <Icon className="size-4 text-muted-foreground" />
            )}
            {children}
            <BaseHandle
              id={"source-1"}
              type="source"
              position={Position.Right}
            />
          </BaseNodeContent>
        </BaseNode>
      </WorkflowNode>
    );
  },
);

BaseTriggerNode.displayName = "BaseTriggerNode";
