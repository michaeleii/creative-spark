import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { MouseEventHandler } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function SidebarItem({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex aspect-video h-[76px] w-full flex-col gap-0 rounded-none",
        {
          "bg-muted text-primary": isActive,
        }
      )}
      onClick={onClick}
    >
      <Icon />
      <span className="capitalize">{label}</span>
    </Button>
  );
}
