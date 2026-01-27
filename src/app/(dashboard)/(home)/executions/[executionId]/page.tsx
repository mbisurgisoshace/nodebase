import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{
    executionId: string;
  }>;
}

export default async function ExecutionPage({ params }: PageProps) {
  await requireAuth();

  const { executionId } = await params;
  return <div>{`ExecutionPage ${executionId}`}</div>;
}
