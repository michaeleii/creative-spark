import type { Canvas, FabricObject } from "fabric";
import { useCallback, useRef } from "react";

interface UseClipboardProps {
  canvas: Canvas | null;
}

export default function useClipboard({ canvas }: UseClipboardProps) {
  const clipboard = useRef<FabricObject | null>(null);
  const copy = useCallback(async () => {
    if (!canvas) return;
    const clonedObject = await canvas.getActiveObject()?.clone();
    if (!clonedObject) return;
    clipboard.current = clonedObject;
  }, [canvas]);

  const paste = useCallback(async () => {
    if (!clipboard.current || !canvas) return;
    const clonedObject = await clipboard.current.clone();
    canvas.discardActiveObject();
    clonedObject.set({
      left: clonedObject.left + 10,
      top: clonedObject.top + 10,
      evented: true,
    });
    if (clonedObject.type === "activeSelection") {
      clonedObject.canvas = canvas;
      canvas?.add(clonedObject);
      clonedObject.setCoords();
    } else {
      canvas?.add(clonedObject);
    }
    clipboard.current.top += 10;
    clipboard.current.left += 10;
    canvas.setActiveObject(clonedObject);
    canvas.requestRenderAll();
  }, [clipboard, canvas]);

  return { copy, paste };
}
