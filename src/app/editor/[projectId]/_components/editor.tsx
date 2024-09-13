"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../_hooks/use-editor";
import { Canvas } from "fabric";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import type { ActiveTool } from "../types";
import ShapeSidebar from "./shape-sidebar";
import FillColorSidebar from "./fill-color-sidebar";
import { SELECTION_DEPENDENT_TOOLS } from "../constants";
import StrokeColorSidebar from "./stroke-color-sidebar";
import StrokeWidthSidebar from "./stroke-width-sidebar";
import OpacitySidebar from "./opacity-sidebar";
import TextSidebar from "./text-sidebar";
import FontSidebar from "./font-sidebar";
import ImageSidebar from "./image-sidebar";
import FilterSidebar from "./filter-sidebar";
import AISidebar from "./ai-sidebar";
import RemoveBGSidebar from "./remove-bg-sidebar";
import DrawingSidebar from "./drawing-sidebar";
import SettingsSidebar from "./settings-sidebar";

export default function Editor() {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onClearSelection = useCallback(() => {
    if (SELECTION_DEPENDENT_TOOLS.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === "draw") {
        editor?.enableDrawingMode();
      }

      if (activeTool === "draw") {
        editor?.disableDrawingMode();
      }

      if (tool === activeTool) {
        return setActiveTool("select");
      }

      setActiveTool(tool);
    },
    [activeTool, editor]
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init(canvas, containerRef.current);

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex h-dvh flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute top-[68px] flex h-[calc(100dvh-68px)] w-full">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        {editor && (
          <>
            <ShapeSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <FillColorSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <StrokeColorSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <StrokeWidthSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <OpacitySidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <TextSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <FontSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <ImageSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <FilterSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <AISidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <RemoveBGSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <DrawingSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
            <SettingsSidebar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
            />
          </>
        )}
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar
            key={JSON.stringify(editor?.canvas.getActiveObject())}
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
          <div
            className="h-[calc(100dvh-176px)] flex-1 bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
