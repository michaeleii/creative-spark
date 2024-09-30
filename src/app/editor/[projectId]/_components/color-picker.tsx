"use client";

import { ChromePicker, CirclePicker } from "react-color";

import { rgbaObjectToString } from "../utils";
import { COLORS } from "../constants";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
        className="rounded-lg border"
      />
      <CirclePicker
        color={value}
        colors={COLORS}
        onChangeComplete={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
      />
    </div>
  );
}
