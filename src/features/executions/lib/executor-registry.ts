import { NodeExecutor } from "../types";
import { NodeType } from "@/generated/prisma/enums";
import { httpRequestExecutor } from "../components/HttpRequest/executor";
import { manualTriggerExecutor } from "@/features/triggers/components/ManualTrigger/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];

  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }

  return executor;
};
