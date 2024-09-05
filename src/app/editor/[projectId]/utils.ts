import type { RGBColor } from "react-color";

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
