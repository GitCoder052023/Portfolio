"use client";

import { useState } from "react";
import type { TechIconProps } from "@/app/types/components";
import { getTechIconConfig } from "@/app/utils/techIcons";
import { hexToRgba } from "@/app/utils/color";

export default function TechIcon({
  name,
  size = 24,
  className = "",
}: TechIconProps) {
  const [imageError, setImageError] = useState(false);
  const { iconUrl, color } = getTechIconConfig(name);

  if (imageError) {
    // Fallback: show a colored badge with text
    return (
      <div
        className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-200 ${className}`}
        style={{
          backgroundColor: hexToRgba(color, 0.1),
          color: color,
        }}
        title={name}
      >
        {name}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg p-2 border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-200 ${className}`}
      style={{
        backgroundColor: hexToRgba(color, 0.1),
      }}
      title={name}
    >
      <img
        src={iconUrl}
        alt={name}
        width={size}
        height={size}
        className="object-contain"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}