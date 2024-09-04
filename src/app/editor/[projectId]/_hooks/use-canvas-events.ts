"use client";

import type { Canvas, FabricObject } from "fabric";
import { useEffect, type Dispatch, type SetStateAction } from "react";

interface UseCanvasEventsOptions {
  canvas: Canvas | null;
  setSelectedObjects: Dispatch<SetStateAction<FabricObject[]>>;
  clearSelectionCallback?: () => void;
}

export function useCanvasEvents({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsOptions) {
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
        clearSelectionCallback?.();
      });
    }
    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, clearSelectionCallback, setSelectedObjects]);
}
