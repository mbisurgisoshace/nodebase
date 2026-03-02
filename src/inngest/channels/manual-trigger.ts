import { channel, topic } from "@inngest/realtime";

import { NodeStatus } from "@/components/react-flow/node-status-indicator";

export const manualTriggerChannel = channel(
  "manual-trigger-execution",
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: NodeStatus;
  }>(),
);
