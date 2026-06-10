import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof Group>) => (
  <Group
    className={cn("data-[panel-group-direction=vertical]:flex-col flex h-full w-full", className)}
    {...props}
  />
);

const ResizablePanel = Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}) => (
  <Separator
    className={cn(
      "[&[data-panel-group-direction=vertical]>div]:rotate-90 after:-translate-x-1/2 after:absolute after:inset-y-0 after:left-1/2 after:w-1 bg-border data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full flex focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-ring items-center justify-center relative w-px",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="bg-border border flex h-4 items-center justify-center rounded-sm w-3 z-10">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
