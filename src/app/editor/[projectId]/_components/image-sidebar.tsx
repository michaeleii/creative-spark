"use client";

import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "./tool-sidebar-close";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import type { Editor } from "../_hooks/use-editor";
import { useGetImages } from "../_hooks/use-get-images";
import { AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";
import { twMerge } from "tailwind-merge";

interface ImageSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor;
}

export default function ImageSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: ImageSidebarProps) {
  const { data: images, isLoading, isError } = useGetImages();
  return (
    <aside
      className={cn(
        "bg-background relative z-40 flex h-[calc(100dvh-68px)] w-[360px] flex-col border-r",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas"
      />
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 gap-y-4">
          <AlertTriangle className="text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch images
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="border-b p-4">
          <UploadButton
            config={{ cn: twMerge }}
            appearance={{
              button: "w-full text-sm font-medium",
              allowedContent: "hidden",
            }}
            content={{
              button: "Upload Image",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              await editor.addImage(res[0].url);
            }}
          />
        </div>
        <div className="p-4">
          <div className="grid gap-2">
            {images &&
              images.images.map((image) => (
                <button
                  key={image.id}
                  onClick={async () => {
                    await editor.addImage(image.urls.regular);
                  }}
                  className="group bg-muted relative h-[150px] w-full overflow-hidden rounded-sm border transition hover:opacity-75"
                >
                  <Image
                    fill
                    src={image.urls.small}
                    alt={image.alt_description ?? "Image From Unsplash"}
                    className="object-cover"
                  />
                  <Link
                    href={image.links.html}
                    target="_blank"
                    className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hover:underline"
                  >
                    {image.user.name}
                  </Link>
                </button>
              ))}
          </div>
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
