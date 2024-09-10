import type { ActiveTool } from "./types";
import material from "material-colors";

export const FILL_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY: number[] = [];
export const FONT_SIZE = 32;
export const FONT_FAMILY = "Arial";
export const FONT_WEIGHT_NORMAL = 400;
export const FONT_WEIGHT_BOLD = 700;

export const COLORS = [
  material.red[500],
  material.pink[500],
  material.purple[500],
  material.deepPurple[500],
  material.indigo[500],
  material.blue[500],
  material.lightBlue[500],
  material.cyan[500],
  material.teal[500],
  material.green[500],
  material.lightGreen[500],
  material.lime[500],
  material.yellow[500],
  material.amber[500],
  material.orange[500],
  material.deepOrange[500],
  material.brown[500],
  material.grey[500],
  material.blueGrey[500],
  "transparent",
];

export const SELECTION_DEPENDENT_TOOLS: ActiveTool[] = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
] as const;

export const FONTS = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const FILTERS = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "grayscale",
  "brightness",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
] as const;
