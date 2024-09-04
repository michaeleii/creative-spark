import { ToolSidebarHeader } from "./tool-sidebar-header";
import ColorPicker from "./color-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "./tool-sidebar-close";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import type { Editor } from "../_hooks/use-editor";
import { STROKE_COLOR } from "../constants";

interface StrokeColorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor;
}

export default function StrokeColorSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: StrokeColorSidebarProps) {
  const strokeColor = editor?.getActiveStrokeColor() ?? STROKE_COLOR;

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke color"
        description="Add stroke color to your elements"
      />
      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker
            value={strokeColor}
            onChange={(value) => {
              editor?.changeStrokeColor(value);
            }}
          />
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
