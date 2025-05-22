import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "./tool-sidebar-close";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import type { Editor } from "../_hooks/use-editor";
import { Button } from "@/components/ui/button";
import { FONTS } from "../constants";

interface FontSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor;
}

export default function FontSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: FontSidebarProps) {
  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Font" description="Change the text font" />
      <ScrollArea>
        <div className="space-y-1 border-b p-4">
          {FONTS.map((font) => (
            <Button
              key={font}
              className={cn(
                "h-16 w-full justify-start text-left",
                editor.getActiveFontFamily() === font &&
                  "border-2 border-blue-500"
              )}
              variant="secondary"
              size="lg"
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => {
                editor.changeFontFamily(font);
              }}
            >
              {font}
            </Button>
          ))}
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
