import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

function TopProgress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={`fixed top-0 left-0 z-[9999] h-1.5 w-full overflow-hidden rounded-full bg-primary/20`}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-1/2 rounded-full bg-primary transition-transform duration-300 animate-slide`}
      />
    </ProgressPrimitive.Root>
  );

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-state="loading"
      className={cn(
        "fixed top-0 left-0 z-[9999] h-1.5 w-full overflow-hidden rounded-full bg-primary/20",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        data-state="loading"
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { TopProgress };
