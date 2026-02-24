import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import {
  WorkflowsContainer,
  WorkflowsList,
} from "@/features/workflows/components/Workflows";

export default async function WorkflowsPage() {
  await requireAuth();
  prefetchWorkflows();

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary
          fallback={
            <>
              <p>Failed to load workflows</p>
            </>
          }
        >
          <Suspense
            fallback={
              <>
                <p>Loading workflows...</p>
              </>
            }
          >
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}
