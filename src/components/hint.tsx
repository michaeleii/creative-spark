import { TooltipContent, Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { ComponentProps, ReactNode } from "react";

export interface HintProps extends ComponentProps<typeof TooltipContent> {
  label: string;
  children: ReactNode;
}

export function Hint({ label, children, ...props }: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="border-slate-800 bg-slate-800 text-primary-foreground dark:border-slate-200 dark:bg-slate-200"
          {...props}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
