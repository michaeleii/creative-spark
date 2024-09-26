import type { Canvas } from "fabric";
import {
  useEffect,
  useRef,
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import { JSON_KEYS } from "../constants";

interface UseLoadStateProps {
  autoZoom: () => void;
  canvas: Canvas | null;
  initialState: MutableRefObject<string | undefined>;
  canvasHistory: MutableRefObject<string[]>;
  setHistoryIndex: Dispatch<SetStateAction<number>>;
}

export default function useLoadState({
  canvas,
  autoZoom,
  initialState,
  canvasHistory,
  setHistoryIndex,
}: UseLoadStateProps) {
  const initialized = useRef(false);

  useEffect(() => {
    const init = async () => {
      if (!initialized.current && initialState.current && canvas) {
        const data = JSON.parse(initialState.current);
        await canvas.loadFromJSON(data);
        const currentState = JSON.stringify(canvas.toDatalessJSON(JSON_KEYS));
        canvasHistory.current = [currentState];
        setHistoryIndex(0);
        autoZoom();
        initialized.current = true;
      }
    };
    init();
  }, [
    canvas,
    autoZoom,
    initialState, // no need this is a ref
    canvasHistory, // no need this is a ref
    setHistoryIndex, // no need this is a dispatch
  ]);
}
