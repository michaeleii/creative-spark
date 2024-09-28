import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Copy, ImageIcon, MoreHorizontal, Trash2 } from "lucide-react";
import { useDuplicateProject } from "../_hooks/use-duplicate-project";
import { useDeleteProject } from "../_hooks/use-delete-project";
import type { ResponseType } from "../_hooks/use-get-projects";
import { Button } from "@/components/ui/button";

interface ProjectItemProps {
  project: ResponseType["result"][number];
  confirm: () => Promise<unknown>;
}

export function ProjectItem({ project, confirm }: ProjectItemProps) {
  const { mutate: copyProject, isPending: isCopying } = useDuplicateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  return (
    <div className="relative space-y-4">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="absolute right-2 top-2 z-10" asChild>
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
            onClick={async () => {
              const ok = await confirm();
              if (ok) {
                deleteProject({ id: project.id });
              }
            }}
            className="flex h-10 cursor-pointer items-center gap-2 text-destructive focus:bg-muted focus:text-destructive"
          >
            <Trash2 className="size-4" />
            <span>Delete Project</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href={`/editor/${project.id}`}>
        <div className="h-80 w-full cursor-pointer rounded-lg bg-muted transition-colors hover:bg-slate-200 md:h-64 lg:h-52">
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt="Thumbnail"
              width={900}
              height={1200}
              className="mx-auto h-full w-full rounded-lg object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="size-20 text-muted-foreground" />
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <span>{project.name}</span>
        <span className="text-sm text-muted-foreground">{`${project.width} x ${project.height}`}</span>
      </div>
    </div>
  );
}

export function ProjectItemSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-52 w-full p-2" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}
