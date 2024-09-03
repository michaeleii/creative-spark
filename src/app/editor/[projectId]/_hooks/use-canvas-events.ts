import type { Canvas, FabricObject } from "fabric";
import { useEffect, type Dispatch, type SetStateAction } from "react";

export function useCanvasEvents(
  canvas: Canvas | null,
  setSelectedObjects: Dispatch<SetStateAction<FabricObject[]>>
) {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
      });
    }
    return () => {
      if (canvas) {
        canvas.removeListeners();
      }
    };
  }, [canvas, setSelectedObjects]);
}
