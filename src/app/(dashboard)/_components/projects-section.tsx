"use client";

import { useGetProjects } from "../_hooks/use-get-projects";
import { AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import useConfirm from "@/hooks/use-confirm";
import { ProjectItem, ProjectItemSkeleton } from "./project-item";

export default function ProjectsSection() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this project",
  });

  return (
    <section className="space-y-6 pb-10">
      <h2 className="text-2xl font-semibold">Recent Designs</h2>
      {status === "pending" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProjectItemSkeleton key={i} />
          ))}
        </div>
      ) : status === "error" ? (
        <div className="flex flex-col items-center justify-center gap-y-4 pt-32">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Failed to load projects
          </p>
        </div>
      ) : !data.pages.length || !data.pages[0].result.length ? (
        <div className="flex flex-col items-center justify-center gap-y-4 pt-32">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No projects found</p>
        </div>
      ) : (
        <div>
          <ConfirmationDialog />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {data.pages
              .at(0)
              ?.result.map((project) => (
                <ProjectItem
                  key={project.id}
                  confirm={confirm}
                  project={project}
                />
              ))}
          </div>
          {hasNextPage && (
            <div className="flex w-full items-center justify-center pt-6">
              <Button
                variant="ghost"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
