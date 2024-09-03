import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Editor } from "../_hooks/use-editor";
import type { ActiveTool } from "../types";

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
  const fillColor = editor?.fillColor ?? "black";

  if (editor?.selectedObjects.length === 0) {
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-background p-2" />;
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-background p-2">
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
  );
}
