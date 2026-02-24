"use client";

import { useRouter } from "next/navigation";

import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { EntityContainer, EntityHeader } from "@/components/EntityComponents";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return <p>{JSON.stringify(workflows.data, null, 2)}</p>;
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { modal, handleError } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        disabled={disabled}
        onNew={handleCreate}
        newButtonLabel="New workflow"
        isCreating={createWorkflow.isPending}
        description="Create and manage your workflows"
      />
    </>
  );
};

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      search={<></>}
      pagination={<></>}
      header={<WorkflowsHeader />}
    >
      {children}
    </EntityContainer>
  );
};
