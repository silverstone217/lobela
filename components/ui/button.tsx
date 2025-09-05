"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "destructive"
    | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-lg shadow-lg",
          {
            /* Variants (couleurs) */
            "bg-primary text-foreground": variant === "primary",
            "bg-secondary text-black": variant === "secondary",
            "bg-accent text-black": variant === "accent",
            "bg-success text-black": variant === "success",
            "bg-destructive text-foreground": variant === "destructive",
            "bg-transparent text-foreground border border-foreground/30":
              variant === "ghost",

            /* Sizes */
            "px-3 py-1.5 text-sm rounded": size === "sm",
            "px-4 py-2 text-base rounded-md": size === "md",
            "px-6 py-3 text-lg rounded-xl": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
