"use client";
import { useGetProject } from "@/app/(dashboard)/_hooks/use-get-project";
import { Button } from "@/components/ui/button";
import { Loader2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import Editor from "./_components/editor";

interface EditorProjectIdPageWrapperProps {
  projectId: string;
}

export default function EditorProjectIdPageWrapper({
  projectId,
}: EditorProjectIdPageWrapperProps) {
  const { data: project, isLoading, isError } = useGetProject(projectId);

  if (isLoading || !project) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Failed to fetch project</p>
        <Button variant="secondary" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }
  return <Editor project={project} />;
}
