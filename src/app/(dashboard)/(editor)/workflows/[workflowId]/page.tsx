interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function WorkflowPage({ params }: PageProps) {
  const { workflowId } = await params;
  return <div>{`WorkflowPage ${workflowId}`}</div>;
}
