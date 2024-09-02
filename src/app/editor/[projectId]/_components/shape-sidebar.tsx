import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./shape-tool";
import { Circle, Diamond, Square, Squircle, Triangle } from "lucide-react";
import type { Editor } from "../_hooks/use-editor";

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor;
}

export default function ShapeSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: ShapeSidebarProps) {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool
            onClick={() => editor?.addCircle()}
            icon={Circle}
            className="fill-black"
          />
          <ShapeTool
            onClick={() => editor?.addSquare()}
            icon={Square}
            className="fill-black"
          />
          <ShapeTool
            onClick={() => editor?.addSquircle()}
            icon={Squircle}
            className="fill-black"
          />
          <ShapeTool
            onClick={() => editor?.addTriangle()}
            icon={Triangle}
            className="fill-black"
          />
          <ShapeTool
            onClick={() => editor?.addInverseTriangle()}
            icon={Triangle}
            className="rotate-180 fill-black"
          />
          <ShapeTool
            onClick={() => editor?.addDiamond()}
            icon={Diamond}
            className="fill-black"
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
