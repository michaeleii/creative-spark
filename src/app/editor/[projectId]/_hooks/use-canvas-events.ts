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
    const clearEvents = canvas?.on({
      "selection:created": (e) => {
        setSelectedObjects(e.selected);
      },
      "selection:updated": (e) => {
        setSelectedObjects(e.selected);
      },
      "selection:cleared": () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      },
    });

    return () => {
      clearEvents?.();
    };
  }, [canvas, clearSelectionCallback, setSelectedObjects]);
}
