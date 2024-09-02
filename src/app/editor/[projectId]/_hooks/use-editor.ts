import { useCallback, useState, useMemo } from "react";
import {
  Circle,
  FabricObject,
  InteractiveFabricObject,
  Polygon,
  Rect,
  Shadow,
  Triangle,
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

const FILL_COLOR = "rgba(0, 0, 0, 1)";
const STROKE_COLOR = "rgba(0, 0, 0, 1)";
const STROKE_WIDTH = 2;

function buildEditor(canvas: Canvas) {
  const getWorkspace = () =>
    canvas.getObjects().find((obj) => obj.name === "clip");

  const center = (object: FabricObject) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: FabricObject) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    addCircle: () => {
      const circle = new Circle({
        radius: 225,
        fill: FILL_COLOR,
        stroke: STROKE_COLOR,
        strokeWidth: STROKE_WIDTH,
      });

      addToCanvas(circle);
    },
    addSquare: () => {
      const square = new Rect({
        width: 400,
        height: 400,
        fill: FILL_COLOR,
        stroke: STROKE_COLOR,
        rx: 20,
        ry: 20,
        strokeWidth: STROKE_WIDTH,
      });
      addToCanvas(square);
    },
    addSquircle: () => {
      const squircle = new Rect({
        width: 400,
        height: 400,
        fill: FILL_COLOR,
        stroke: STROKE_COLOR,
        rx: 50,
        ry: 50,
        strokeWidth: STROKE_WIDTH,
      });
      addToCanvas(squircle);
    },
    addTriangle: () => {
      const triangle = new Triangle({
        width: 400,
        height: 400,
        fill: FILL_COLOR,
        stroke: STROKE_COLOR,
        strokeWidth: STROKE_WIDTH,
      });
      addToCanvas(triangle);
    },
    addInverseTriangle: () => {
      const triangleInverse = new Polygon(
        [
          { x: 0, y: 0 },
          { x: 400, y: 0 },
          { x: 200, y: 400 },
        ],
        {
          fill: FILL_COLOR,
          stroke: STROKE_COLOR,
          strokeWidth: STROKE_WIDTH,
          width: 400,
          height: 400,
        }
      );
      addToCanvas(triangleInverse);
    },
    addDiamond: () => {
      const diamond = new Polygon(
        [
          { x: 0, y: 0 },
          { x: 200, y: 200 },
          { x: 0, y: 400 },
          { x: -200, y: 200 },
        ],
        {
          fill: FILL_COLOR,
          stroke: STROKE_COLOR,
          strokeWidth: STROKE_WIDTH,
          width: 600,
          height: 600,
        }
      );
      addToCanvas(diamond);
    },
  };
}

export type Editor = ReturnType<typeof buildEditor>;

export function useEditor() {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor(canvas);
    }
    return undefined;
  }, [canvas]);

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
    },
    []
  );

  return {
    init,
    editor,
  };
}
