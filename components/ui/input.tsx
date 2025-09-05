"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label className="text-sm font-bold text-foreground px-1">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-background border-2 border-foreground/20",
            "text-foreground placeholder:text-foreground/40 font-medium",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50",
            "transition-all duration-200 shadow-inner",
            error &&
              "border-destructive focus:border-destructive focus:ring-destructive/50",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-destructive text-xs font-semibold px-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
