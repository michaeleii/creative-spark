import EditorProjectIdPageWrapper from "./editor-wrapper";

interface EditorProjectIdPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function EditorProjectIdPage({
  params,
}: EditorProjectIdPageProps) {
  const { projectId } = await params;

  return <EditorProjectIdPageWrapper projectId={projectId} />;
}
