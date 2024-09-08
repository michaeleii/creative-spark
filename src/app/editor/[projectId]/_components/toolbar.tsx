import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Editor } from "../_hooks/use-editor";
import type { ActiveTool } from "../types";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  Bold,
  ChevronDown,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import { isTextType } from "../utils";
import { useState } from "react";
import { FONT_WEIGHT_BOLD, FONT_WEIGHT_NORMAL } from "../constants";

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
  const [toolbarRefresh, setToolbarRefresh] = useState(false);

  const refreshToolbar = () => {
    setToolbarRefresh(!toolbarRefresh);
  };

  if (!editor) {
    return null;
  }
  const fillColor = editor.getActiveFillColor();
  const strokeColor = editor.getActiveStrokeColor();
  const fontFamily = editor.getActiveFontFamily();
  const fontWeight = editor.getActiveFontWeight();
  const fontStyle = editor.getActiveFontStyle();
  const textAlign = editor.getActiveTextAlign();

  const selectedObject = editor.selectedObjects.at(0);
  const isText = isTextType(selectedObject?.type);
  const isBold = fontWeight > FONT_WEIGHT_NORMAL;
  const isItalic = fontStyle === "italic";
  const isUnderline = editor.getActiveTextUnderline();
  const isLinethrough = editor.getActiveTextLinethrough();

  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }
    const newWeight = isBold ? FONT_WEIGHT_NORMAL : FONT_WEIGHT_BOLD;
    editor.changeFontWeight(newWeight);
    refreshToolbar();
  };

  const toggleItalic = () => {
    if (!selectedObject) {
      return;
    }
    const newStyle = isItalic ? "normal" : "italic";
    editor.changeFontStyle(newStyle);
    refreshToolbar();
  };

  const toggleLinethrough = () => {
    if (!selectedObject) {
      return;
    }
    editor.changeTextLinethrough(!isLinethrough);
    refreshToolbar();
  };

  const toggleUnderline = () => {
    if (!selectedObject) {
      return;
    }
    editor.changeTextUnderline(!isUnderline);
    refreshToolbar();
  };

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
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleBold}
              size="icon"
              variant="ghost"
              className={cn(isBold && "bg-gray-100 dark:bg-gray-900")}
            >
              <Bold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(isItalic && "bg-gray-100 dark:bg-gray-900")}
            >
              <Italic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Strikethrough" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLinethrough}
              size="icon"
              variant="ghost"
              className={cn(isLinethrough && "bg-gray-100 dark:bg-gray-900")}
            >
              <Strikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant="ghost"
              className={cn(isUnderline && "bg-gray-100 dark:bg-gray-900")}
            >
              <Underline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <>
          <div className="flex h-full items-center justify-center">
            <Hint label="Left Align" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  editor?.changeTextAlign("left");
                  refreshToolbar();
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  textAlign === "left" && "bg-gray-100 dark:bg-gray-900"
                )}
              >
                <AlignLeft className="size-4" />
              </Button>
            </Hint>
          </div>
          <div className="flex h-full items-center justify-center">
            <Hint label="Center Align" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  editor?.changeTextAlign("center");
                  refreshToolbar();
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  textAlign === "center" && "bg-gray-100 dark:bg-gray-900"
                )}
              >
                <AlignCenter className="size-4" />
              </Button>
            </Hint>
          </div>
          <div className="flex h-full items-center justify-center">
            <Hint label="Right Align" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  editor?.changeTextAlign("right");
                  refreshToolbar();
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  textAlign === "right" && "bg-gray-100 dark:bg-gray-900"
                )}
              >
                <AlignRight className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
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
