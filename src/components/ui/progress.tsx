import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

import { useMediaQuery } from "@/lib/use-media-query";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const isBreakPointSmall = useMediaQuery("(min-width: 640px)");
  const isBreakPointExtraSmall = useMediaQuery("(min-width: 480px)");

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-pokemon-blue xs:max-sm:bg-pokemon-blue/70 relative h-2 w-full xs:max-sm:h-full xs:max-sm:w-4 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`bg-pink-400 xs:max-sm:bg-pink-400/70 h-full w-full flex-1 transition-all`}
        style={{
          transform: `${
            isBreakPointSmall
              ? `translateX(-${100 - (value || 0)}%)`
              : isBreakPointExtraSmall
              ? `translateY(-${100 - (value || 0)}%)`
              : `translateX(-${100 - (value || 0)}%)`
          }`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
