"use client";
import { AlertTriangle, Search } from "lucide-react";
import { useGetTemplates } from "../_hooks/use-get-templates";
import {
  TemplateItem,
  TemplateItemSkeleton,
  type Template,
} from "./template-item";
import { useCreateProject } from "../_hooks/use-create-project";
import { useRouter } from "next/navigation";

export default function TemplateSection() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();
  const { data, isLoading, isError } = useGetTemplates({
    page: "1",
    limit: "4",
  });

  const handleClick = (template: Template) => {
    //TODO: Check if template is pro

    createProject(
      {
        name: `${template.name} project`,
        data: template.data,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: (project) => {
          router.push(`/editor/${project.id}`);
        },
        onError: () => {},
      }
    );
  };

  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold">Start with a template</h3>
      <div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <TemplateItemSkeleton key={i} />
            ))
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-y-4 pt-32">
              <AlertTriangle className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Failed to load projects
              </p>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-y-4 pt-32">
              <Search className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No projects found</p>
            </div>
          ) : (
            data.map((template) => (
              <TemplateItem
                disabled={isPending}
                onClick={handleClick}
                key={template.id}
                template={template}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
