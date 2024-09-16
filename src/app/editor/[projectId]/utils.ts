import { filters, type FabricObject } from "fabric";
import type { RGBColor } from "react-color";
import type { Filter } from "./types";

export function isTextType(type?: string) {
  return type === "text" || type === "i-text" || type === "textbox";
}

export function rgbaObjectToString(rgba: RGBColor | "transparent") {
  if (rgba === "transparent") {
    return `rgba(0, 0, 0, 0)`;
  }
  const alpha = rgba.a ?? 1;
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
}

export function arrayIsEqual<TArray1, TArray2>(
  a: TArray1[],
  b: TArray2[]
): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) {
      return false;
    }
  }
  return true;
}

export function createFilter(value: Filter) {
  let effect;
  switch (value) {
    case "polaroid":
      effect = new filters.Polaroid();
      break;
    case "sepia":
      effect = new filters.Sepia();
      break;
    case "kodachrome":
      effect = new filters.Kodachrome();
      break;
    case "contrast":
      effect = new filters.Contrast();
      break;
    case "brightness":
      effect = new filters.Brightness();
      break;
    case "grayscale":
      effect = new filters.Grayscale();
      break;
    case "brownie":
      effect = new filters.Brownie();
      break;
    case "vintage":
      effect = new filters.Vintage();
      break;
    case "technicolor":
      effect = new filters.Technicolor();
      break;
    case "pixelate":
      effect = new filters.Pixelate();
      break;
    case "invert":
      effect = new filters.Invert();
      break;
    case "blur":
      effect = new filters.Blur();
      break;
    case "sharpen":
      effect = new filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case "emboss":
      effect = new filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case "removecolor":
      effect = new filters.RemoveColor({
        distance: 0.5,
      });
      break;
    case "blacknwhite":
      effect = new filters.BlackWhite();
      break;
    case "vibrance":
      effect = new filters.Vibrance({
        vibrance: 1,
      });
      break;
    case "blendcolor":
      effect = new filters.BlendColor({
        color: "#00ff00",
        mode: "multiply",
      });
      break;
    case "huerotate":
      effect = new filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case "resize":
      effect = new filters.Resize();
      break;
    case "saturation":
      effect = new filters.Saturation({
        saturation: 0.7,
      });
      break;
    case "gamma":
      effect = new filters.Gamma({
        gamma: [1, 0.5, 2.1],
      });
      break;
    default:
      effect = null;
      return;
  }
  return effect;
}

export function downloadFile(dataUrl: string, type: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `${generateRandomFileName()}.${type}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function generateRandomFileName() {
  return Array.from(crypto.getRandomValues(new Uint8Array(15)))
    .map((b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 20);
}

interface CanvasJson extends FabricObject {
  objects: CanvasJson[];
}

export function transformText(json: CanvasJson[]) {
  if (!json) return;
  json.forEach((item) => {
    if (item.objects) {
      transformText(item.objects);
    } else {
      if (item.type) {
        item.type = "textbox";
      }
    }
  });
}
