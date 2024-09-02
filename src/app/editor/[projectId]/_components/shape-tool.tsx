import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ShapeToolProps {
  onClick: () => void;
  icon: LucideIcon;
  className?: string;
}

export default function ShapeTool({
  onClick,
  icon: Icon,
  className,
}: ShapeToolProps) {
  return (
    <button onClick={onClick} className="aspect-square rounded-md border p-5">
      <Icon className={cn("h-full w-full", className)} />
    </button>
  );
}
