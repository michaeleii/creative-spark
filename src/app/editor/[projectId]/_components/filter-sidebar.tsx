import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "./tool-sidebar-close";
import { cn } from "@/lib/utils";
import type { ActiveTool, Filter } from "../types";
import type { Editor } from "../_hooks/use-editor";
import { Button } from "@/components/ui/button";
import { FILTERS } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { FabricImage } from "fabric";

interface FilterSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor;
}

export default function FilterSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: FilterSidebarProps) {
  const selectedObject = useMemo(
    () => editor?.selectedObjects.at(0),
    [editor?.selectedObjects]
  );

  const activeImageFilters = editor?.getActiveImageFilters();
  const initialActiveFilter =
    activeImageFilters && activeImageFilters.at(0)
      ? (activeImageFilters.at(0)?.type as Filter)
      : "none";

  const [activeFilter, setActiveFilter] = useState<Filter>(initialActiveFilter);

  useEffect(() => {
    if (selectedObject instanceof FabricImage) {
      const filters = selectedObject.filters;
      const selectedFilter = filters.at(0)?.type as Filter;
      setActiveFilter(selectedFilter ?? "none");
    }
  }, [selectedObject]);

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r bg-background",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filter"
        description="Apply a filter to the selected image"
      />
      <ScrollArea>
        <div className="space-y-1 border-b p-4">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              className={cn(
                "h-16 w-full justify-start text-left",
                activeFilter?.toLowerCase() === filter.toLowerCase() &&
                  "border-2 border-blue-500"
              )}
              variant="secondary"
              size="lg"
              onClick={() => {
                setActiveFilter(filter);
                editor?.changeImageFilter(filter);
              }}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose
        onClick={() => {
          onChangeActiveTool("select");
        }}
      />
    </aside>
  );
}
