"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../_hooks/use-editor";
import { Canvas } from "fabric";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import type { ActiveTool } from "../types";

export default function Editor() {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }
      if (tool === "draw") {
        // TODO: Implement draw mode
      }

      if (activeTool === "draw") {
        // TODO: Disable draw mode
      }
      setActiveTool(tool);
    },
    [activeTool]
  );

  const { init } = useEditor();

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
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar />
          <div
            className="h-[calc(100dvh-124px)] flex-1 bg-muted"
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
