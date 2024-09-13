import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Editor } from "../_hooks/use-editor";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FabricImage } from "fabric";
import { AlertTriangle } from "lucide-react";
import { useRemoveBG } from "../_hooks/use-remove-bg";

interface RemoveBGSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor;
}

export default function RemoveBGSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: RemoveBGSidebarProps) {
  const { mutate: removeImageBackground, isPending } = useRemoveBG();

  const selectedObject = editor.selectedObjects.at(0);
  const imageSrc =
    selectedObject instanceof FabricImage
      ? selectedObject._originalElement instanceof HTMLImageElement
        ? selectedObject._originalElement.currentSrc
        : null
      : null;

  function handleClick() {
    if (!imageSrc) {
      return;
    }
    // TODO: Implement paywall
    removeImageBackground(
      { image: imageSrc },
      {
        onSuccess: ({ image }) => {
          editor?.addImage(image);
        },
      }
    );
  }

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "remove-bg" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Background removal"
        description="Remove background of image using AI"
      />
      {!imageSrc && (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p>Feature not avaliable for this object. Please select an image.</p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="space-y-4 p-4">
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded-md bg-muted transition",
                isPending && "opacity-50"
              )}
            >
              <Image src={imageSrc} alt="Image" fill className="object-cover" />
            </div>
            <Button
              disabled={isPending}
              onClick={handleClick}
              className="w-full"
            >
              Remove background
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose
        onClick={() => {
          onChangeActiveTool("select");
        }}
      />
    </aside>
  );
}
