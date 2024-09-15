import type { Canvas } from "fabric";
import { useCallback, useRef, useState } from "react";

interface UseHistoryProps {
  canvas: Canvas | null;
}

export function useHistory({ canvas }: UseHistoryProps) {
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasHistory = useRef<string[]>([]);
  const skipSave = useRef(false);
  const canUndo = useCallback(() => historyIndex > 0, [historyIndex]);
  const canRedo = useCallback(
    () => historyIndex < canvasHistory.current.length - 1,
    [historyIndex]
  );
  const save = useCallback(
    (skip = false) => {
      if (!canvas) return;
      const currentState = canvas.toJSON();
      const stringifiedState = JSON.stringify(currentState);
      if (!skip && !skipSave.current) {
        canvasHistory.current.push(stringifiedState);
        setHistoryIndex(canvasHistory.current.length - 1);
      }
      // TODO: Save callback
    },
    [canvas]
  );

  const undo = useCallback(async () => {
    if (canUndo()) {
      skipSave.current = true;
      if (!canvas) return;
      canvas.clear();
      canvas.renderAll();
      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(canvasHistory.current[previousIndex]);
      await canvas.loadFromJSON(previousState);
      canvas.renderAll();
      setHistoryIndex(previousIndex);
      skipSave.current = false;
    }
  }, [canUndo, canvas, historyIndex]);
  const redo = useCallback(async () => {
    if (canRedo()) {
      skipSave.current = true;
      if (!canvas) return;
      canvas.clear();
      canvas.renderAll();
      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(canvasHistory.current[nextIndex]);
      await canvas.loadFromJSON(nextState);
      canvas.renderAll();
      setHistoryIndex(nextIndex);
      skipSave.current = false;
    }
  }, [canRedo, canvas, historyIndex]);

  return { save, undo, redo, canUndo, canRedo, setHistoryIndex, canvasHistory };
}
