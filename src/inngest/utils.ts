import toposort from "toposort";

import { Connection, Node } from "@/generated/prisma/client";

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[],
): Node[] => {
  if (connections.length === 0) return nodes;

  const edges: [string, string][] = connections.map((conn) => [
    conn.fromNodeId,
    conn.toNodeId,
  ]);

  const connectedNodeIds = new Set<string>();

  connections.forEach((conn) => {
    connectedNodeIds.add(conn.fromNodeId);
    connectedNodeIds.add(conn.toNodeId);
  });

  nodes.forEach((node) => {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  });

  let sortedNodeIds: string[];

  try {
    sortedNodeIds = toposort(edges);
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cyclic")) {
      throw new Error("Workflow contains a cycle");
    }

    throw error;
  }

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return sortedNodeIds.map((nodeId) => nodeMap.get(nodeId)!).filter(Boolean);
};
