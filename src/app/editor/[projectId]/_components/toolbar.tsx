import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Editor } from "../_hooks/use-editor";
import type { ActiveTool } from "../types";
import { FILL_COLOR, STROKE_COLOR } from "../constants";
import { BsBorderWidth } from "react-icons/bs";

interface ToolbarProps {
  editor?: Editor;
  activeTool: string;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function Toolbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) {
  const fillColor = editor?.getActiveFillColor() ?? FILL_COLOR;
  const strokeColor = editor?.getActiveStrokeColor() ?? STROKE_COLOR;

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-background p-2" />
    );
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-background p-2">
      <div className="flex h-full items-center justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="icon"
            variant="ghost"
            className={cn(
              activeTool === "fill" && "bg-gray-100 dark:bg-gray-900"
            )}
          >
            <div
              className="size-4 rounded-sm border"
              style={{
                backgroundColor: fillColor,
              }}
            ></div>
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Stroke Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-color")}
            size="icon"
            variant="ghost"
            className={cn(
              activeTool === "stroke-color" && "bg-gray-100 dark:bg-gray-900"
            )}
          >
            <div
              className="size-4 rounded-sm border-2"
              style={{
                borderColor: strokeColor,
              }}
            ></div>
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Stroke Options" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-width")}
            size="icon"
            variant="ghost"
            className={cn(
              activeTool === "stroke-width" && "bg-gray-100 dark:bg-gray-900"
            )}
          >
            <BsBorderWidth className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
}
