import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bg-transparent border border-input disabled:cursor-not-allowed disabled:opacity-50 flex focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm min-h-[60px] placeholder:text-muted-foreground px-3 py-2 rounded-md shadow-sm text-base w-full",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
