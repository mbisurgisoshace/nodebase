import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/features/editor/components/Editor";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { EditorHeader } from "@/features/editor/components/EditorHeader";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function WorkflowPage({ params }: PageProps) {
  await requireAuth();

  const { workflowId } = await params;

  prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
