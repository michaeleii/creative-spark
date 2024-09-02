import { useCallback, useState } from "react";
import {
  FabricObject,
  InteractiveFabricObject,
  Rect,
  Shadow,
  type Canvas,
} from "fabric";
import { useAutoResize } from "./use-auto-resize";

interface CustomFabricObjectProps {
  id?: string;
  name?: string;
}

declare module "fabric" {
  interface FabricObject extends CustomFabricObjectProps {}
  interface SerializedOjectProps extends CustomFabricObjectProps {}
}

FabricObject.customProperties = ["id", "name"];

export function useEditor() {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize(canvas, container);

  const init = useCallback(
    (initialCanvas: Canvas, initialContainer: HTMLDivElement) => {
      InteractiveFabricObject.ownDefaults = {
        ...InteractiveFabricObject.ownDefaults,
        cornerColor: "#fff",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      };
      const initialWorkspace = new Rect({
        name: "clip",
        width: 900,
        height: 1200,
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });
      initialCanvas.setDimensions({
        width: initialContainer.offsetWidth,
        height: initialContainer.offsetHeight,
      });

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const test = new Rect({
        width: 100,
        height: 100,
        fill: "black",
      });
      initialCanvas.add(test);
      initialCanvas.centerObject(test);
    },
    []
  );

  return {
    init,
  };
}
