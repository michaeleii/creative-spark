"use client";

import { useEffect, useRef } from "react";
import { useEditor } from "./use-editor";
import { Canvas } from "fabric";

export default function Editor() {
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
    <div ref={containerRef} className="flex h-full flex-col">
      <div className="h-full flex-1 bg-muted">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
