import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("flex items-center relative select-none touch-none w-full", className)}
    {...props}
  >
    <SliderPrimitive.Track className="bg-primary/20 grow h-1.5 overflow-hidden relative rounded-full w-full">
      <SliderPrimitive.Range className="absolute bg-primary h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="bg-background block border border-primary/50 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-4 rounded-full shadow transition-colors w-4" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
