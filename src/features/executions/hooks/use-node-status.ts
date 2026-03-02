import { useEffect, useState } from "react";
import type { Realtime } from "@inngest/realtime";
import { useInngestSubscription } from "@inngest/realtime/hooks";

import type { NodeStatus } from "@/components/react-flow/node-status-indicator";

interface UseNodeStatusOptions {
  topic: string;
  nodeId: string;
  channel: string;
  refreshToken: () => Promise<Realtime.Subscribe.Token>;
}

export function useNodeStatus({
  topic,
  nodeId,
  channel,
  refreshToken,
}: UseNodeStatusOptions) {
  const [status, setStatus] = useState<NodeStatus>("initial");

  const { data } = useInngestSubscription({
    refreshToken,
    enabled: true,
  });

  useEffect(() => {
    if (!data.length) return;

    // Find the latest message for this node
    const latestMessage = data
      .filter(
        (message) =>
          message.kind === "data" &&
          message.topic === topic &&
          message.channel === channel &&
          message.data.nodeId === nodeId,
      )
      .sort((a, b) => {
        if (a.kind === "data" && b.kind === "data") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        return 0;
      })[0];

    if (latestMessage?.kind === "data") {
      setStatus(latestMessage.data.status as NodeStatus);
    }
  }, [data, nodeId, channel, topic]);

  return status;
}
