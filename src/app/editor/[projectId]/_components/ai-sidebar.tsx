import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Editor } from "../_hooks/use-editor";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "../_hooks/use-generated-image";
import { useState } from "react";

interface AISidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor;
}

export default function AISidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: AISidebarProps) {
  const [prompt, setPrompt] = useState("");
  const { mutate: generateImage, isPending } = useGenerateImage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Block with paywall

    generateImage(
      { prompt },
      {
        onSuccess: ({ image }) => {
          editor.addImage(image);
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <form className="space-y-6 p-4" onSubmit={handleSubmit}>
          <Textarea
            placeholder="A cat holding a sign that says hello world"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            cols={30}
            rows={10}
            required
            minLength={3}
          />
          <Button disabled={isPending} className="w-full" type="submit">
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose
        onClick={() => {
          onChangeActiveTool("select");
        }}
      />
    </aside>
  );
}
