import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./shape-tool";
import { Circle, Diamond, Square, Squircle, Triangle } from "lucide-react";

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function ShapeSidebar({
  activeTool,
  onChangeActiveTool,
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
          <ShapeTool onClick={() => {}} icon={Circle} className="fill-black" />
          <ShapeTool onClick={() => {}} icon={Square} className="fill-black" />
          <ShapeTool
            onClick={() => {}}
            icon={Squircle}
            className="fill-black"
          />
          <ShapeTool
            onClick={() => {}}
            icon={Triangle}
            className="fill-black"
          />
          <ShapeTool
            onClick={() => {}}
            icon={Triangle}
            className="rotate-180 fill-black"
          />
          <ShapeTool onClick={() => {}} icon={Diamond} className="fill-black" />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
