import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-transparent border border-input disabled:cursor-not-allowed disabled:opacity-50 file:bg-transparent file:border-0 file:font-medium file:text-foreground file:text-sm flex focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 md:text-sm placeholder:text-muted-foreground px-3 py-1 rounded-md shadow-sm text-base transition-colors w-full",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
