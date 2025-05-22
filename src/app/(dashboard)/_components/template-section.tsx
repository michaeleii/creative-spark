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
    limit: "5",
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
        <div className="flex gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <TemplateItemSkeleton key={i} />
            ))
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-y-4 pt-32">
              <AlertTriangle className="text-muted-foreground size-6" />
              <p className="text-muted-foreground text-sm">
                Failed to load projects
              </p>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-y-4 pt-32">
              <Search className="text-muted-foreground size-6" />
              <p className="text-muted-foreground text-sm">No projects found</p>
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
