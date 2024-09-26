"use client";

import {
  useCallback,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction,
  useRef,
} from "react";
import {
  Circle,
  CircleBrush,
  FabricImage,
  FabricObject,
  InteractiveFabricObject,
  PencilBrush,
  Polygon,
  Rect,
  Shadow,
  SprayBrush,
  Textbox,
  Triangle,
  type Canvas,
  type TDataUrlOptions,
  type TextboxProps,
  type TOptions,
} from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { useCanvasEvents } from "./use-canvas-events";
import {
  createFilter,
  downloadFile,
  generateRandomFileName,
  isTextType,
  transformText,
} from "../utils";
import {
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT_NORMAL,
  JSON_KEYS,
  MAX_ZOOM_RATIO,
  MIN_ZOOM_RATIO,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  ZOOM_IN_RATIO,
  ZOOM_OUT_RATIO,
} from "../constants";
import type {
  BrushType,
  Filter,
  FontStyle,
  FontWeight,
  ProjectSaveSchema,
  TextAlign,
} from "../types";
import useClipboard from "./use-clipboard";
import { useHistory } from "./use-history";
import { useHotkeys } from "./use-hotkeys";
import useLoadState from "./use-load-state";

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
  strokeDashArray: number[];
  setFillColor: Dispatch<SetStateAction<string>>;
  setStrokeColor: Dispatch<SetStateAction<string>>;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
  setStrokeDashArray: Dispatch<SetStateAction<number[]>>;
  fontFamily: string;
  setFontFamily: Dispatch<SetStateAction<string>>;
  selectedObjects: FabricObject[];
  copy: () => Promise<void>;
  paste: () => Promise<void>;
  autoZoom: () => Promise<void>;
  save: (skip?: boolean) => void;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

function buildEditor({
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  strokeDashArray,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  setStrokeDashArray,
  fontFamily,
  setFontFamily,
  selectedObjects,
  copy,
  paste,
  autoZoom,
  save,
  undo,
  redo,
  canUndo,
  canRedo,
}: BuildEditorProps) {
  const generateSaveOptions = (): TDataUrlOptions | undefined => {
    const workspace = getWorkspace();
    if (!workspace) {
      return;
    }
    const { width, height, left, top } = workspace;
    return {
      multiplier: 1,
      format: "png",
      quality: 1,
      width,
      height,
      left,
      top,
    };
  };

  const savePNG = () => {
    const options = generateSaveOptions();
    if (!options) return;
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const dataUrl = canvas.toDataURL(options);
    downloadFile(dataUrl, "png");
  };
  const saveSVG = () => {
    const options = generateSaveOptions();
    if (!options) return;
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const dataUrl = canvas.toDataURL(options);
    downloadFile(dataUrl, "svg");
  };
  const saveJPG = () => {
    const options = generateSaveOptions();
    if (!options) return;
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const dataUrl = canvas.toDataURL(options);
    downloadFile(dataUrl, "jpg");
  };
  const saveJSON = async () => {
    const json = canvas.toDatalessJSON(JSON_KEYS);
    transformText(json.objects);
    const file = new File(
      [JSON.stringify(json, null, "\t")],
      `${generateRandomFileName()}.json`,
      {
        type: "text/json;charset=utf-8",
      }
    );
    const dataUrl = URL.createObjectURL(file);
    downloadFile(dataUrl, "json");
  };

  const loadJSON = async (file: string) => {
    const json = JSON.parse(file);
    await canvas.loadFromJSON(json);
    autoZoom();
  };

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
    savePNG,
    saveJPG,
    saveSVG,
    saveJSON,
    loadJSON,
    canUndo,
    canRedo,
    undo,
    redo,
    autoZoom,
    zoomIn: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio += ZOOM_IN_RATIO;
      const centerPoint = canvas.getCenterPoint();
      canvas.zoomToPoint(
        centerPoint,
        zoomRatio > MAX_ZOOM_RATIO ? MAX_ZOOM_RATIO : zoomRatio
      );
    },
    zoomOut: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio -= ZOOM_OUT_RATIO;
      const centerPoint = canvas.getCenterPoint();
      canvas.zoomToPoint(
        centerPoint,
        zoomRatio < MIN_ZOOM_RATIO ? MIN_ZOOM_RATIO : zoomRatio
      );
    },
    getWorkspace,
    changeSize: async (value: { width: number; height: number }) => {
      const workspace = getWorkspace();
      workspace?.set(value);
      await autoZoom();
      save();
    },
    changeBackground: (value: string) => {
      const workspace = getWorkspace();
      workspace?.set({ fill: value });
      canvas.renderAll();
      save();
    },
    changeFreeDrawingBrush: (value: BrushType) => {
      switch (value) {
        case "pencil":
          canvas.freeDrawingBrush = new PencilBrush(canvas);
          break;
        case "circle":
          canvas.freeDrawingBrush = new CircleBrush(canvas);
          break;
        case "spray":
          canvas.freeDrawingBrush = new SprayBrush(canvas);
          break;
        default:
          canvas.freeDrawingBrush = new PencilBrush(canvas);
      }
      canvas.freeDrawingBrush.color = strokeColor;
      canvas.freeDrawingBrush.width = strokeWidth;
    },
    enableDrawingMode: () => {
      canvas.discardActiveObject();
      canvas.renderAll();
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.freeDrawingBrush.width = strokeWidth;
      canvas.freeDrawingBrush.color = strokeColor;
    },
    disableDrawingMode: () => {
      canvas.isDrawingMode = false;
    },
    copy,
    paste,
    getActiveImageFilters: () => {
      const selectedObject = selectedObjects.at(0);

      return selectedObject instanceof FabricImage
        ? selectedObject.filters
        : [{ type: "none" }];
    },
    changeImageFilter: (value: Filter) => {
      const objects = canvas.getActiveObjects();
      objects.forEach((object) => {
        if (object instanceof FabricImage) {
          const imageObject = object;
          const effect = createFilter(value);
          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();
          canvas.renderAll();
        }
      });
      canvas.renderAll();
    },
    addImage: async (value: string) => {
      const image = await FabricImage.fromURL(value, {
        crossOrigin: "anonymous",
      });
      const workspace = getWorkspace();
      if (!workspace) {
        return;
      }
      image.scaleToWidth(workspace.width);
      image.scaleToHeight(workspace.height);
      addToCanvas(image);
    },
    delete: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.remove(object);
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontSize: value });
        }
      });
      canvas.renderAll();
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects.at(0);
      //@ts-expect-error: fontSize is a valid property for FabricObject
      return (selectedObject?.fontSize as number) ?? FONT_SIZE;
    },
    changeTextAlign: (value: TextAlign) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ textAlign: value });
        }
      });
      canvas.renderAll();
    },
    getActiveTextAlign: (): TextAlign => {
      const selectedObject = selectedObjects.at(0);
      //@ts-expect-error: textAlign is a valid property for FabricObject
      return (selectedObject?.textAlign as TextAlign) ?? "left";
    },
    changeTextUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ underline: value });
        }
      });
      canvas.renderAll();
    },
    getActiveTextUnderline: (): boolean => {
      const selectedObject = selectedObjects.at(0);
      //@ts-expect-error: underline is a valid property for FabricObject
      return selectedObject?.underline ?? false;
    },
    changeTextLinethrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ linethrough: value });
        }
      });
      canvas.renderAll();
    },
    getActiveTextLinethrough: (): boolean => {
      const selectedObject = selectedObjects.at(0);
      //@ts-expect-error: linethrough is a valid property for FabricObject
      return selectedObject?.linethrough ?? false;
    },
    getActiveFontStyle: (): FontStyle => {
      const selectedObject = selectedObjects.at(0);
      //@ts-expect-error: fontStyle is a valid property for FabricObject
      return (selectedObject?.fontStyle as FontStyle) ?? "normal";
    },
    getActiveFontWeight: (): FontWeight => {
      const selectedObject = selectedObjects.at(0);
      //@ts-expect-error: fontWeight is a valid property for FabricObject
      return (selectedObject?.fontWeight as FontWeight) ?? FONT_WEIGHT_NORMAL;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects.at(0);
      //@ts-expect-error: fontFamily is a valid property for FabricObject
      return (selectedObject?.fontFamily as string) ?? fontFamily;
    },
    changeFontStyle: (value: FontStyle) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontStyle: value });
        }
      });
      canvas.renderAll();
    },
    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontWeight: value });
        }
      });
      canvas.renderAll();
    },
    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          obj.set({ fontFamily: value });
        }
      });
      canvas.renderAll();
    },
    addText: (text: string, options?: TOptions<TextboxProps>) => {
      const textbox = new Textbox(text, {
        left: 100,
        top: 100,
        fill: fillColor,
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
        ...options,
      });
      addToCanvas(textbox);
    },

    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });
      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringObjectForward(object);
      });
      canvas.renderAll();
      const workspace = getWorkspace();
      if (!workspace) {
        return;
      }
      canvas.sendObjectToBack(workspace);
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendObjectBackwards(object);
      });
      canvas.renderAll();
      const workspace = getWorkspace();
      if (!workspace) {
        return;
      }
      canvas.sendObjectToBack(workspace);
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects.at(0);
      return selectedObject?.opacity;
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects.at(0);
      // Currently gradients & patterns are not supported
      return selectedObject?.fill?.toString() ?? fillColor;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects.at(0);
      // Currently gradients & patterns are not supported
      return selectedObject?.stroke?.toString() ?? strokeColor;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects.at(0);
      return selectedObject?.strokeWidth ?? strokeWidth;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects.at(0);
      return selectedObject?.strokeDashArray ?? strokeDashArray;
    },
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
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = value;
      }
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        // Text types don't have stroke
        if (isTextType(obj.type)) {
          return obj.set({ fill: value });
        }
        obj.set({ stroke: value });
      });
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = value;
      }
      canvas.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const circle = new Circle({
        radius: 225,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
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
        strokeDashArray: strokeDashArray,
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
          strokeDashArray: strokeDashArray,
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
        strokeDashArray: strokeDashArray,
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
          strokeDashArray: strokeDashArray,
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
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(diamond);
    },
    canvas,
    selectedObjects,
  };
}

export type Editor = ReturnType<typeof buildEditor>;

interface UseEditorOptions {
  defaultState?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  clearSelectionCallback?: () => void;
  saveCallback?: (values: ProjectSaveSchema) => void;
}

export function useEditor({
  defaultState,
  defaultWidth,
  defaultHeight,
  clearSelectionCallback,
  saveCallback,
}: UseEditorOptions) {
  const initialState = useRef(defaultState);
  const initialWidth = useRef(defaultWidth);
  const initialHeight = useRef(defaultHeight);

  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<FabricObject[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState(STROKE_DASH_ARRAY);
  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);

  const { save, undo, redo, canUndo, canRedo, setHistoryIndex, canvasHistory } =
    useHistory({
      canvas,
      saveCallback,
    });

  const { copy, paste } = useClipboard({ canvas });

  const { autoZoom } = useAutoResize({ canvas, container });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
    save,
  });

  useHotkeys({ canvas, undo, redo, copy, paste, save });

  useLoadState({
    canvas,
    autoZoom,
    canvasHistory,
    initialState,
    setHistoryIndex,
  });

  const editor = useMemo(() => {
    if (!canvas) {
      return undefined;
    }
    return buildEditor({
      fillColor,
      strokeColor,
      strokeWidth,
      strokeDashArray,
      setFillColor,
      setStrokeColor,
      setStrokeWidth,
      setStrokeDashArray,
      fontFamily,
      setFontFamily,
      canvas,
      selectedObjects,
      copy,
      paste,
      autoZoom,
      save,
      undo,
      redo,
      canUndo,
      canRedo,
    });
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    strokeDashArray,
    fontFamily,
    selectedObjects,
    copy,
    paste,
    autoZoom,
    save,
    undo,
    redo,
    canUndo,
    canRedo,
  ]);

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
        selectable: false,
        hasControls: false,
        fill: "white",
        width: initialWidth.current,
        height: initialHeight.current,
        name: "clip",
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

      const currentState = JSON.stringify(
        initialCanvas.toDatalessJSON(JSON_KEYS)
      );
      canvasHistory.current = [currentState];
      setHistoryIndex(0);
    },
    // no need because they are from useRef and useState
    [canvasHistory, setHistoryIndex]
  );

  return {
    init,
    editor,
  };
}
