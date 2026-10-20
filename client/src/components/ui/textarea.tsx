import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-xl border-0 bg-elevated px-4 text-base text-foreground shadow-[inset_0_0_0_1px_hsl(var(--border))] transition-shadow duration-200 placeholder:text-subtle focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_hsl(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50 min-h-[140px] py-3 leading-relaxed",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

