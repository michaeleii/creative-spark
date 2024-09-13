import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Editor } from "../_hooks/use-editor";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ColorPicker from "./color-picker";

interface SettingsSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor;
}

export default function SettingsSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: SettingsSidebarProps) {
  const workspace = editor.getWorkspace();
  const initialWidth = useMemo(
    () => workspace?.width.toString() ?? "0",
    [workspace]
  );
  const initialHeight = useMemo(
    () => workspace?.height.toString() ?? "0",
    [workspace]
  );
  const initialBackground = useMemo(
    // Currently we don't support gradients or patterns
    () => workspace?.fill?.toString() ?? "#fff",
    [workspace]
  );
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialHeight, initialBackground]);

  const changeBackground = (value: string) => {
    setBackground(value);
    editor.changeBackground(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "settings" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Configure your workspace settings"
      />
      <ScrollArea>
        <form className="space-y-4 p-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker value={background} onChange={changeBackground} />
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
