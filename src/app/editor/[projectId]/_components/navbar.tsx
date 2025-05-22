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
  Loader,
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
import { useFilePicker } from "use-file-picker";
import UserButton from "@/components/user-button";
import { BsCloudSlash } from "react-icons/bs";

interface NavbarProps {
  isSaving: boolean;
  isSavingError: boolean;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor;
}

export function Navbar({
  isSaving,
  isSavingError,
  activeTool,
  onChangeActiveTool,
  editor,
}: NavbarProps) {
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: { plainFiles?: File[] }) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "utf-8");
        reader.onload = () => {
          if (typeof reader.result === "string") {
            editor?.loadJSON(reader.result);
          }
        };
      }
    },
  });
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
              onClick={() => openFilePicker()}
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
        {isSaving && (
          <div className="flex items-center gap-x-2">
            <Loader className="size-4 animate-spin text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Saving...</p>
          </div>
        )}
        {!isSaving && isSavingError && (
          <div className="flex items-center gap-x-2">
            <BsCloudSlash className="size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Failed to Save</p>
          </div>
        )}
        {!isSaving && !isSavingError && (
          <div className="flex items-center gap-x-2">
            <Check className="size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
        )}
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
                onClick={() => editor?.saveJSON()}
              />
              <DropdownMenuItemButton
                icon={ImageIcon}
                title="PNG"
                description="Best for sharing on the web"
                onClick={() => editor?.savePNG()}
              />
              <DropdownMenuItemButton
                icon={ImageIcon}
                title="JPG"
                description="Best for printing"
                onClick={() => editor?.saveJPG()}
              />
              <DropdownMenuItemButton
                icon={Shapes}
                title="SVG"
                description="Best for editing in vector software"
                onClick={() => editor?.saveSVG()}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
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
