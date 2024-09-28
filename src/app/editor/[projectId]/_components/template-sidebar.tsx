"use client";

import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "./tool-sidebar-close";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import type { Editor } from "../_hooks/use-editor";
import { AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useGetTemplates } from "@/app/(dashboard)/_hooks/use-get-templates";
import useConfirm from "@/hooks/use-confirm";

interface TemplateSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor;
}

export default function TemplateSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: TemplateSidebarProps) {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to replace the current project with this template.",
  });
  const {
    data: templates,
    isLoading,
    isError,
  } = useGetTemplates({ limit: "20", page: "1" });

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "templates" ? "visible" : "hidden"
      )}
    >
      <ConfirmDialog />
      <ToolSidebarHeader
        title="Templates"
        description="Choose from a variety of templates to get started"
      />
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      )}
      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 gap-y-4">
          <AlertTriangle className="text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Failed to fetch templates
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4">
          <div className="grid gap-2">
            {templates &&
              templates.map((template) => (
                <button
                  style={{
                    aspectRatio: `${template.width}/${template.height}`,
                  }}
                  key={template.id}
                  onClick={async () => {
                    // TODO: Check if template is pro

                    const ok = await confirm();

                    if (ok) {
                      await editor.loadJSON(template.data);
                    }
                  }}
                  className="group relative w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
                >
                  {template.thumbnailUrl && (
                    <Image
                      fill
                      src={template.thumbnailUrl}
                      alt={template.name}
                      className="object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {template.name}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose
        onClick={() => {
          onChangeActiveTool("select");
        }}
      />
    </aside>
  );
}
