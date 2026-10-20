import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-300 ease-apple active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] hover:bg-primary-hi",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "text-foreground shadow-[inset_0_0_0_1px_var(--button-outline)] hover:bg-foreground/[0.06] hover:shadow-[inset_0_0_0_1px_hsl(0_0%_100%/0.28)]",
        secondary: "bg-elevated text-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-foreground/[0.06]",
        link: "text-primary-hi underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-5 text-[0.9375rem]",
        sm: "min-h-10 px-4 text-sm",
        lg: "min-h-12 px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

