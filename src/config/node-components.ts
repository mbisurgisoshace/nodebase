import type { NodeTypes } from "@xyflow/react";

import { NodeType } from "@/generated/prisma/enums";
import { InitialNode } from "@/components/InitialNodel";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes;

export type registeredNodeType = keyof typeof nodeComponents;
