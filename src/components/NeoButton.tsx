"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap border-3 border-neo-black font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white text-neo-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100",
        primary: "bg-neo-lime text-neo-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] after:from-white/20 after:to-transparent after:opacity-0 hover:after:opacity-100",
        secondary: "bg-neo-pink text-white shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] after:from-white/20 after:to-transparent after:opacity-0 hover:after:opacity-100",
        outline: "bg-transparent border-3 border-neo-black shadow-none hover:bg-concrete",
        ghost: "border-transparent shadow-none hover:bg-concrete hover:text-neo-black active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 text-sm",
        lg: "h-16 px-8 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const NeoButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NeoButton.displayName = "NeoButton";

export { NeoButton, buttonVariants };

