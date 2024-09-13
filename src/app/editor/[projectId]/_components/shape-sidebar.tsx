import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./shape-tool";
import { FaCircle, FaSquare, FaStar } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import type { Editor } from "../_hooks/use-editor";

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor;
}

export default function ShapeSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: ShapeSidebarProps) {
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
          <ShapeTool onClick={() => editor.addCircle()} icon={FaCircle} />
          <ShapeTool onClick={() => editor.addSquare()} icon={FaSquare} />
          <ShapeTool onClick={() => editor.addStar()} icon={FaStar} />
          <ShapeTool onClick={() => editor.addTriangle()} icon={IoTriangle} />
          <ShapeTool
            onClick={() => editor.addInverseTriangle()}
            icon={IoTriangle}
            className="rotate-180"
          />
          <ShapeTool onClick={() => editor.addDiamond()} icon={FaDiamond} />
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
