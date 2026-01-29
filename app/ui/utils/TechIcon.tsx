"use client";

import { useState } from "react";
import type { TechIconProps } from "../../types/components";
import {
  DEV_ICON_NAMES,
  ICONIFY_ICONS,
  ICON_SLUG_MAP,
  TECH_COLORS,
} from "../../constants/techIcons";
import { hexToRgba } from "../../utils/color";

export default function TechIcon({
  name,
  size = 24,
  className = "",
}: TechIconProps) {
  const [imageError, setImageError] = useState(false);

  const techName = name.toLowerCase().trim();
  const color = TECH_COLORS[techName] || "#787774";

  // Check which CDN to use
  let iconUrl: string;

  if (DEV_ICON_NAMES[techName]) {
    // Use DevIcon/TechIcons CDN for matplotlib
    iconUrl = `https://icon.icepanel.io/Technology/svg/${DEV_ICON_NAMES[techName]}.svg`;
  } else if (ICONIFY_ICONS[techName]) {
    // Use Iconify CDN for seaborn
    iconUrl = `https://api.iconify.design/${
      ICONIFY_ICONS[techName]
    }.svg?color=${color.replace("#", "%23")}`;
  } else {
    // Use Simple Icons CDN for everything else
    const iconSlug =
      ICON_SLUG_MAP[techName] || techName.replace(/[^a-z0-9]/g, "");
    iconUrl = `https://cdn.simpleicons.org/${iconSlug}/${color.replace(
      "#",
      ""
    )}`;
  }

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