import { useCallback } from "react";
import { InteractiveFabricObject, Rect, Shadow, type Canvas } from "fabric";

export function useEditor() {
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
        width: 900,
        height: 1200,
        name: "clip",
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
