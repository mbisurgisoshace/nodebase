import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getWorkflows.queryOptions());
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created`);
        queryClient.invalidateQueries(
          trpc.workflows.getWorkflows.queryOptions(),
        );
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    }),
  );
};
