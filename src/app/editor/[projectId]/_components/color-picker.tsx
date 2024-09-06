"use client";
import dynamic from "next/dynamic";

const ChromePicker = dynamic(
  () => import("react-color").then(({ ChromePicker }) => ChromePicker),
  {
    ssr: false,
  }
);

const CirclePicker = dynamic(
  () => import("react-color").then(({ CirclePicker }) => CirclePicker),
  {
    ssr: false,
  }
);

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
