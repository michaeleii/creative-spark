import { auth } from "@/lib/auth";
import EditorProjectIdPageWrapper from "./editor-wrapper";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface EditorProjectIdPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function EditorProjectIdPage({
  params,
}: EditorProjectIdPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  const { projectId } = await params;

  return <EditorProjectIdPageWrapper projectId={projectId} />;
}
