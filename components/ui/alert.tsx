"use client";
import React from "react";
import { Info, CircleCheck, CircleX } from "lucide-react";
type AlertProps = {
  message: string;
  type?: "success" | "error" | "info";
  className?: string;
};

export const Alert = ({ message, type = "success", className }: AlertProps) => {
  const icons = {
    success: <CircleCheck className="size-5 text-primary mr-3 shrink-0" />,
    error: <CircleX className="size-5 text-destructive mr-3 shrink-0" />,
    info: <Info className="size-5 text-foreground mr-3 shrink-0" />,
  };

  return (
    <div
      className={` ${type} ${className}
        w-full p-4  rounded-2xl flex items-center border shadow-sm
        border-foreground/20 bg-background/50 text-foreground
        text-sm
    `}
    >
      {icons[type]}
      <p>{message}</p>
    </div>
  );
};
