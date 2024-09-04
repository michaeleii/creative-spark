import type { ActiveTool } from "./types";

export const FILL_COLOR = "rgba(255, 255, 255, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 4;

export const SELECTION_DEPENDENT_TOOLS: ActiveTool[] = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
] as const;
