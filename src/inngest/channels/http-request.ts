import { channel, topic } from "@inngest/realtime";

import { NodeStatus } from "@/components/react-flow/node-status-indicator";

export const httpRequestChannel = channel("http-request-execution").addTopic(
  topic("status").type<{
    nodeId: string;
    status: NodeStatus;
  }>(),
);
