"use client";

import {
  addEdge,
  MiniMap,
  Controls,
  type Node,
  type Edge,
  ReactFlow,
  Background,
  type XYPosition,
  type NodeChange,
  type EdgeChange,
  type Connection,
  applyEdgeChanges,
  applyNodeChanges,
  Panel,
} from "@xyflow/react";
import { useState, useCallback } from "react";

import { ErrorView, LoadingView } from "@/components/EntityComponents";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import {
  Node as DbNode,
  Connection as DbConnection,
} from "@/generated/prisma/client";

import "@xyflow/react/dist/style.css";
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "./AddNodeButton";

export const EditorLoading = () => {
  return <LoadingView message="Loading editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};

const transformNode = (node: DbNode): Node => {
  return {
    id: node.id,
    type: node.type,
    position: node.position as XYPosition,
    data: node.data as Record<string, unknown>,
  };
};

const transformConnection = (connection: DbConnection): Edge => {
  return {
    id: connection.id,
    source: connection.fromNodeId,
    target: connection.toNodeId,
    sourceHandle: connection.fromOutput,
    targetHandle: connection.toInput,
  };
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes.map(transformNode));
  const [edges, setEdges] = useState<Edge[]>(
    workflow.connections.map(transformConnection),
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div className="size-full">
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <MiniMap />
        <Controls />
        <Background />
        <Panel position="top-right">
          <AddNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
};
