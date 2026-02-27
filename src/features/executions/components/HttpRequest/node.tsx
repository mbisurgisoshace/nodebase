"use client";

import { memo, useState } from "react";
import { GlobeIcon } from "lucide-react";
import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";

import { FormType, HttpRequestDialog } from "./Dialog";
import { BaseExecutionNode } from "../BaseExecutionNode";

type HttpRequestNodeData = {
  body?: string;
  endpoint?: string;
  variableName?: string;
  [key: string]: unknown;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = "initial";

  const nodeData = props.data;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configured";

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  const handleSubmit = (values: FormType) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endpoint: values.endpoint,
              method: values.method,
              body: values.body,
              variableName: values.variableName,
            },
          };
        }
        return node;
      }),
    );
  };

  return (
    <>
      <HttpRequestDialog
        open={dialogOpen}
        onSubmit={handleSubmit}
        defaultBody={nodeData.body}
        onOpenChange={setDialogOpen}
        defaultMethod={nodeData.method}
        defaultEndpoint={nodeData.endpoint}
        defaultVariableName={nodeData.variableName}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        status={nodeStatus}
        name="HTTP Request"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
