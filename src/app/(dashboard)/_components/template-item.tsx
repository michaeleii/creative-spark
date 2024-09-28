import Image from "next/image";
import type { ResponseType } from "../_hooks/use-get-templates";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Crown, SquareArrowOutUpRight } from "lucide-react";

export type Template = ResponseType[number];
interface TemplateItemProps {
  template: Template;
  onClick: (template: Template) => void;
  disabled?: boolean;
}

export function TemplateItem({
  template,
  onClick,
  disabled,
}: TemplateItemProps) {
  return (
    <button
      onClick={() => {
        onClick(template);
      }}
      className={cn(
        "group flex cursor-pointer flex-col space-y-2 text-left transition",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"
      )}
    >
      {template.thumbnailUrl && (
        <div
          style={{ aspectRatio: `${template.width}/${template.height}` }}
          className="relative h-full w-full overflow-hidden rounded-xl border"
        >
          <Image
            src={template.thumbnailUrl}
            alt={template.name}
            fill
            className="transform object-cover transition group-hover:scale-105"
          />
          {template.isPro && (
            <div className="absolute right-2 top-2 z-10 flex size-10 items-center justify-center rounded-full bg-black/50">
              <Crown className="size-6 fill-yellow-500 text-yellow-500" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-xl bg-black/50 opacity-0 backdrop-blur-sm backdrop-filter transition group-hover:opacity-100">
            <span className="font-medium text-white">Open in Editor</span>
            <SquareArrowOutUpRight className="size-4 text-white" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <p>{template.name}</p>
        <p className="text-sm text-muted-foreground">{`${template.width} x ${template.height} px`}</p>
      </div>
    </button>
  );
}

export function TemplateItemSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="aspect-[900/1200] h-full w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}
