import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Minimize2, ZoomIn, ZoomOut } from "lucide-react";
import type { Editor } from "../_hooks/use-editor";

interface FooterProps {
  editor: Editor;
}

export default function Footer({ editor }: FooterProps) {
  return (
    <footer className="z-[49] flex h-[52px] w-full shrink-0 flex-row-reverse items-center gap-x-1 overflow-x-auto border-t bg-background p-2 px-4">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => editor.autoZoom()}
          className="h-full"
          variant="ghost"
          size="icon"
        >
          <Minimize2 className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          onClick={() => editor.zoomIn()}
          className="h-full"
          variant="ghost"
          size="icon"
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => editor.zoomOut()}
          className="h-full"
          variant="ghost"
          size="icon"
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
}
