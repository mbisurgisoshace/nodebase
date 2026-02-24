import { Suspense } from "react";
import { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils";
import {
  WorkflowsList,
  WorkflowsContainer,
} from "@/features/workflows/components/Workflows";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function WorkflowsPage({ searchParams }: Props) {
  await requireAuth();
  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);

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
