import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Editor } from "../_hooks/use-editor";
import ColorPicker from "./color-picker";
import { FILL_COLOR } from "../constants";

interface FillColorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor;
}

export default function FillColorSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: FillColorSidebarProps) {
  const fillColor = editor?.getActiveFillColor() || FILL_COLOR;

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Fill color"
        description="Add fill color to your elements"
      />
      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker
            value={fillColor}
            onChange={(value) => {
              editor?.changeFillColor(value);
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
