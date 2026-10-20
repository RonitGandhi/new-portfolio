import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-xl border-0 bg-elevated px-4 text-base text-foreground shadow-[inset_0_0_0_1px_hsl(var(--border))] transition-shadow duration-200 placeholder:text-subtle focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_hsl(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50 h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

