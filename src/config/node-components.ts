import type { NodeTypes } from "@xyflow/react";

import { NodeType } from "@/generated/prisma/enums";
import { InitialNode } from "@/components/InitialNodel";
import { HttpRequestNode } from "@/features/executions/components/HttpRequest/node";
import { ManualTriggerNode } from "@/features/triggers/components/ManualTrigger/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type registeredNodeType = keyof typeof nodeComponents;
