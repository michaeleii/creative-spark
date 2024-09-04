import { Point, util, type Canvas } from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeOptions {
  canvas: Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeOptions) => {
  const autoZoom = useCallback(async () => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setDimensions({
      width,
      height,
    });

    const center = canvas.getCenterPoint();

    const zoomRatio = 0.85;
    const localWorkspace = canvas
      .getObjects()
      .find((obj) => obj.name === "clip");

    if (!localWorkspace) return;

    const scale = util.findScaleToFit(localWorkspace, {
      width,
      height,
    });

    const zoom = zoomRatio * scale;

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    canvas.zoomToPoint(new Point(center.x, center.y), zoom);

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    )
      return;

    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    const cloned = await localWorkspace.clone();
    canvas.clipPath = cloned;
    canvas.requestRenderAll();
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (!canvas || !container) return;

    resizeObserver = new ResizeObserver(() => {
      autoZoom();
    });

    resizeObserver.observe(container);

    return () => {
      if (!resizeObserver) return;
      resizeObserver.disconnect();
    };
  }, [canvas, container, autoZoom]);
};
