import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "./tool-sidebar-close";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import type { Editor } from "../_hooks/use-editor";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useState } from "react";

interface OpacitySidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor;
}

export default function OpacitySidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: OpacitySidebarProps) {
  const initialOpacity = editor?.getActiveOpacity() ?? 1;
  const selectedObject = useMemo(
    () => editor?.selectedObjects.at(0),
    [editor?.selectedObjects]
  );

  const [opacity, setOpacity] = useState(initialOpacity);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.opacity);
    }
  }, [selectedObject]);

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Change the opacity of the selected object"
      />
      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          <Label className="text-sm">Opacity</Label>
          <Slider
            value={[opacity]}
            onValueChange={([value]) => {
              setOpacity(value);
              editor?.changeOpacity(value);
            }}
            min={0}
            max={1}
            step={0.01}
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
