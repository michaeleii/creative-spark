import type { z } from "zod";
import type { BRUSH_TYPES, FILTERS } from "./constants";
import type { projectSaveSchema } from "@/db/schema/projects";

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

type FontWeightNormal = 400;
type FontWeightBold = 700;

export type FontWeight = FontWeightNormal | FontWeightBold;

export type FontStyle = "normal" | "italic";

export type TextAlign = "left" | "center" | "right";

export type Filter = (typeof FILTERS)[number];

export type BrushType = (typeof BRUSH_TYPES)[number];

export type ProjectSaveSchema = z.infer<typeof projectSaveSchema>;
