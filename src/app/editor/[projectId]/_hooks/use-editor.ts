import {
  useCallback,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";
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
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";
import { FILL_COLOR, STROKE_COLOR, STROKE_WIDTH } from "../constants";

interface CustomFabricObjectProps {
  id?: string;
  name?: string;
}

declare module "fabric" {
  interface FabricObject extends CustomFabricObjectProps {}
  interface SerializedOjectProps extends CustomFabricObjectProps {}
}

FabricObject.customProperties = ["id", "name"];

interface BuildEditorProps {
  canvas: Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  setFillColor: Dispatch<SetStateAction<string>>;
  setStrokeColor: Dispatch<SetStateAction<string>>;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
  selectedObjects: FabricObject[];
}

function buildEditor({
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  selectedObjects,
}: BuildEditorProps) {
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
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ fill: value });
      });
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeWidth: value });
      });
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        // Text types don't have stroke
        if (isTextType(obj.type)) {
          obj.set({ fill: value });
          return;
        }
        obj.set({ stroke: value });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const circle = new Circle({
        radius: 225,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(circle);
    },
    addSquare: () => {
      const square = new Rect({
        width: 400,
        height: 400,
        rx: 20,
        ry: 20,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(square);
    },
    addStar: () => {
      const star = new Polygon(
        [
          { x: 0, y: -200 },
          { x: 58, y: -80 },
          { x: 190, y: -62 },
          { x: 95, y: 30 },
          { x: 117, y: 162 },
          { x: 0, y: 100 },
          { x: -117, y: 162 },
          { x: -95, y: 30 },
          { x: -190, y: -62 },
          { x: -58, y: -80 },
        ],
        {
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          width: 400,
          height: 400,
        }
      );
      addToCanvas(star);
    },
    addTriangle: () => {
      const triangle = new Triangle({
        width: 400,
        height: 400,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
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
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
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
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          width: 600,
          height: 600,
        }
      );
      addToCanvas(diamond);
    },
    selectedObjects,
  };
}

export type Editor = ReturnType<typeof buildEditor>;

export function useEditor() {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<FabricObject[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        selectedObjects,
      });
    }
    return undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects]);

  useAutoResize(canvas, container);

  useCanvasEvents(canvas, setSelectedObjects);

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
