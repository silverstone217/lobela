"use client";

import Image, { StaticImageData } from "next/image";
import lion from "@/public/images/lion.jpg";

type AvatarProps = {
  name?: string | null;
  image?: string | null | undefined | StaticImageData;
  size?: "sm" | "md" | "lg"; // tailles adaptables
};

export const Avatar = ({ name, image, size = "md" }: AvatarProps) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "UT";

  const img = image ?? lion;

  // Tailwind size classes
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        bg-secondary/30 
       
        shadow-lg 
        flex items-center justify-center 
        overflow-hidden
        relative
        transition-transform duration-200
        hover:scale-105 hover:shadow-2xl
      `}
    >
      {image ? (
        <Image
          src={img}
          alt={name ?? "user avatar"}
          className="w-full h-full object-cover transition-opacity duration-300"
          priority
          width={64}
          height={64}
        />
      ) : (
        <div className="font-bold uppercase text-foreground tracking-wider select-none">
          {initials}
        </div>
      )}

      {/* Optional playful glow effect */}
      <span className="absolute inset-0 rounded-full  animate-pulse pointer-events-none"></span>
    </div>
  );
};
