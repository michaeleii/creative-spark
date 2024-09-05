import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "./tool-sidebar-close";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import type { Editor } from "../_hooks/use-editor";
import { STROKE_DASH_ARRAY, STROKE_WIDTH } from "../constants";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { arrayIsEqual } from "../utils";

interface StrokeWidthSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor;
}

export default function StrokeWidthSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: StrokeWidthSidebarProps) {
  const strokeWidth = editor?.getActiveStrokeWidth() ?? STROKE_WIDTH;
  const strokeType = editor?.getActiveStrokeDashArray() ?? STROKE_DASH_ARRAY;

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke width"
        description="Modify the stroke width of your elements"
      />
      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          <Label className="text-sm">Stroke width</Label>
          <Slider
            value={[strokeWidth]}
            onValueChange={([value]) => editor?.changeStrokeWidth(value)}
          />
        </div>
        <div className="space-y-4 border-b p-4">
          <Label className="text-sm">Stroke type</Label>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "h-16 w-full justify-start p-2 px-4 text-left",
              arrayIsEqual(strokeType, []) && "border-2 border-blue-500"
            )}
            onClick={() => editor?.changeStrokeDashArray([])}
          >
            <div className="w-full rounded-full border-4 border-black" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "h-16 w-full justify-start p-2 px-4 text-left",
              arrayIsEqual(strokeType, [5, 5]) && "border-2 border-blue-500"
            )}
            onClick={() => editor?.changeStrokeDashArray([5, 5])}
          >
            <div className="w-full rounded-full border-4 border-dashed border-black" />
          </Button>
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
