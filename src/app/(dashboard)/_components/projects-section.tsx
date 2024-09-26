"use client";

import {
  AlertTriangle,
  Copy,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import { useGetProjects } from "../_hooks/use-get-projects";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDuplicateProject } from "../_hooks/use-duplicate-project";
import { useDeleteProject } from "../_hooks/use-delete-project";

export default function ProjectsSection() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();
  const { mutate: copyProject, isPending: isCopying } = useDuplicateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Recent Designs</h2>
      {status === "pending" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-52 w-full p-2" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
        </div>
      ) : status === "error" ? (
        <div className="flex flex-col items-center justify-center gap-y-4 pt-32">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Failed to load projects
          </p>
        </div>
      ) : !data.pages.length ? (
        <div className="flex flex-col items-center justify-center gap-y-4 pt-32">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No projects found</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {data.pages.at(0)?.result.map((project) => (
              <div key={project.id} className="space-y-4">
                <div className="relative h-80 w-full cursor-pointer rounded-lg bg-muted transition-colors hover:bg-slate-200 md:h-64 lg:h-52">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger
                      className="absolute right-2 top-2"
                      asChild
                    >
                      <Button variant="ghost" size="icon" disabled={false}>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-60">
                      <DropdownMenuItem
                        disabled={isCopying}
                        onClick={() => copyProject({ id: project.id })}
                        className="flex h-10 cursor-pointer items-center gap-2"
                      >
                        <Copy className="size-4" />
                        <span>Make a copy</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={isDeleting}
                        onClick={() => deleteProject({ id: project.id })}
                        className="flex h-10 cursor-pointer items-center gap-2 text-destructive focus:bg-muted focus:text-destructive"
                      >
                        <Trash2 className="size-4" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Image
                    src={project.thumbnailUrl ?? "/placeholder_thumbnail.svg"}
                    alt="Thumbnail"
                    width={900}
                    height={1200}
                    className="mx-auto h-full w-full rounded-lg object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span>{project.name}</span>
                  <span className="text-sm text-muted-foreground">{`${project.width} x ${project.height}`}</span>
                </div>
              </div>
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
