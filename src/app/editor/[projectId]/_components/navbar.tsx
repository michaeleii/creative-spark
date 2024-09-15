import { Hint } from "@/components/hint";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import {
  Check,
  ChevronDown,
  Code2,
  Download,
  File,
  ImageIcon,
  MousePointerClick,
  Redo2,
  Shapes,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import type { MouseEventHandler } from "react";
import type { ActiveTool } from "../types";
import { cn } from "@/lib/utils";
import type { Editor } from "../_hooks/use-editor";

interface NavbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor;
}

export function Navbar({
  activeTool,
  onChangeActiveTool,
  editor,
}: NavbarProps) {
  return (
    <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4">
      <Logo />
      <div className="flex h-full w-full items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              <span>File</span>
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItemButton
              icon={File}
              title="Open"
              description="Open a JSON file"
              onClick={() => {
                console.log("Open");
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <VerticalSeparator />
        <NavbarActionButton
          icon={MousePointerClick}
          label="Select"
          onClick={() => onChangeActiveTool("select")}
          className={cn(
            activeTool === "select" && "bg-gray-100 dark:bg-gray-900"
          )}
        />
        <NavbarActionButton
          icon={Undo2}
          label="Undo"
          disabled={!editor?.canUndo()}
          onClick={async () => await editor?.undo()}
        />

        <NavbarActionButton
          icon={Redo2}
          label="Redo"
          disabled={!editor?.canRedo()}
          onClick={async () => await editor?.redo()}
        />
        <VerticalSeparator />
        <div className="flex items-center gap-x-2">
          <Check className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Saved</p>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-x-4"
              >
                <span>Export</span>
                <Download className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItemButton
                icon={Code2}
                title="JSON"
                description="Save for later editing"
                onClick={() => {}}
              />
              <DropdownMenuItemButton
                icon={ImageIcon}
                title="PNG"
                description="Best for sharing on the web"
                onClick={() => {}}
              />
              <DropdownMenuItemButton
                icon={Shapes}
                title="SVG"
                description="Best for editing in vector software"
                onClick={() => {}}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

interface NavbarActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

function NavbarActionButton({
  label,
  icon: Icon,
  onClick,
  className,
  disabled,
}: NavbarActionButtonProps) {
  return (
    <Hint label={label} side="bottom" sideOffset={10}>
      <Button
        disabled={disabled}
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={className}
      >
        <Icon className="size-4" />
      </Button>
    </Hint>
  );
}

function VerticalSeparator() {
  return <Separator orientation="vertical" className="mx-2" />;
}

interface DropdownMenuItemButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

function DropdownMenuItemButton({
  icon: Icon,
  title,
  description,
  onClick,
}: DropdownMenuItemButtonProps) {
  return (
    <DropdownMenuItem className="flex items-center gap-x-2" onClick={onClick}>
      <Icon className="size-6" />
      <div>
        <p>{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </DropdownMenuItem>
  );
}
