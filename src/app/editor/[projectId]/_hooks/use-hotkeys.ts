import { ActiveSelection, type Canvas } from "fabric";
import { useEventListener } from "usehooks-ts";

interface UseHotkeysProps {
  canvas: Canvas | null;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  copy: () => Promise<void>;
  paste: () => Promise<void>;
  save: (skip?: boolean) => void;
}
export function useHotkeys({
  canvas,
  undo,
  redo,
  copy,
  paste,
  save,
}: UseHotkeysProps) {
  useEventListener("keydown", async (e) => {
    const isCtrl = e.ctrlKey || e.metaKey;
    const isBackspace = e.key === "Backspace";
    const isDelete = e.key === "Delete";
    const isInput =
      e.target instanceof HTMLElement &&
      ["INPUT", "TEXTAREA"].includes(e.target.tagName);
    if (isInput) return;
    if (isBackspace || isDelete) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrl) {
      e.preventDefault();
      switch (e.key) {
        case "z":
          await undo();
          break;
        case "y":
          await redo();
          break;
        case "c":
          await copy();
          break;
        case "v":
          await paste();
          break;
        case "s":
          save(true);
          break;
        case "a":
          canvas?.discardActiveObject();
          const allObjects = canvas
            ?.getObjects()
            .filter((obj) => obj.selectable);
          canvas?.setActiveObject(new ActiveSelection(allObjects, { canvas }));
          canvas?.renderAll();
          break;
        case "d":
          await copy();
          await paste();
          break;
      }
    }
  });
}
