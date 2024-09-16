import { useEventListener } from "usehooks-ts";
export function useWindowEvents() {
  useEventListener("beforeunload", (e) => {
    (e || window.event).returnValue = "Are you sure you want to leave?";
  });
}
