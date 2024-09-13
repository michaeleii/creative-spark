import { cn } from "@/lib/utils";
import type { ActiveTool, BrushType } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Editor } from "../_hooks/use-editor";
import ColorPicker from "./color-picker";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BRUSH_TYPES } from "../constants";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DrawingSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor;
}

export default function DrawingSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: DrawingSidebarProps) {
  const [activeBrush, setActiveBrush] = useState<BrushType>("pencil");
  const strokeColor = editor.getActiveStrokeColor();
  const strokeWidth = editor.getActiveStrokeWidth();

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "draw" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Drawing Mode"
        description="Modify brush settings"
      />
      <ScrollArea>
        <div className="space-y-6 border-b p-4">
          <Label>Brush Width</Label>
          <Slider
            value={[strokeWidth]}
            onValueChange={([values]) => {
              editor.changeStrokeWidth(values);
            }}
          />
        </div>
        <div className="space-y-6 border-b p-4">
          <ColorPicker
            value={strokeColor}
            onChange={(value) => {
              editor.changeStrokeColor(value);
            }}
          />
        </div>
        <div className="space-y-6 border-b p-4">
          <Label>Brush Type</Label>
          {BRUSH_TYPES.map((brush) => (
            <Button
              key={brush}
              className={cn(
                "h-16 w-full justify-start text-left",
                activeBrush.toLowerCase() === brush.toLowerCase() &&
                  "border-2 border-blue-500"
              )}
              variant="secondary"
              size="lg"
              onClick={() => {
                editor.changeFreeDrawingBrush(brush);
                setActiveBrush(brush);
              }}
            >
              {brush}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose
        onClick={() => {
          editor?.disableDrawingMode();
          onChangeActiveTool("select");
        }}
      />
    </aside>
  );
}
