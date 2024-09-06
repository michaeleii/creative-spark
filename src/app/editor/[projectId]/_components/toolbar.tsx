import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Editor } from "../_hooks/use-editor";
import type { ActiveTool } from "../types";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { isTextType } from "../utils";

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
  if (!editor) {
    return null;
  }
  const fillColor = editor.getActiveFillColor();
  const strokeColor = editor.getActiveStrokeColor();
  const fontFamily = editor.getActiveFontFamily();

  const selectedObject = editor.selectedObjects.at(0);
  const isText = isTextType(selectedObject?.type);

  if (editor.selectedObjects.length === 0) {
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
      {!isText && (
        <>
          <div className="flex h-full items-center justify-center">
            <Hint label="Stroke Color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "stroke-color" &&
                    "bg-gray-100 dark:bg-gray-900"
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
            <Hint label="Stroke Width" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-width")}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "stroke-width" &&
                    "bg-gray-100 dark:bg-gray-900"
                )}
              >
                <BsBorderWidth className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100 dark:bg-gray-900"
              )}
            >
              <div className="max-w-[300px] truncate">{fontFamily}</div>
              <ChevronDown className="ml-2 size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex h-full items-center justify-center">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Send Backwards" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(
              activeTool === "opacity" && "bg-gray-100 dark:bg-gray-900"
            )}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
}
