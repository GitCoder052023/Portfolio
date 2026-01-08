"use client";

import { useState } from "react";

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

// Tech stack color mappings (Notion-style colors)
const techColors: Record<string, string> = {
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  react: "#61DAFB",
  nextjs: "#000000",
  "next.js": "#000000",
  "tanstack start": "#FF6B35",
  tanstackstart: "#FF6B35",
  tanstack: "#FF6B35",
  nodejs: "#339933",
  "node.js": "#339933",
  express: "#000000",
  "express.js": "#000000",
  expressjs: "#000000",
  mongodb: "#47A248",
  postgresql: "#4169E1",
  supabase: "#3ECF8E",
  python: "#3776AB",
  pandas: "#150458",
  numpy: "#013243",
  matplotlib: "#11557C",
  seaborn: "#3776AB",
  plotly: "#3F4F75",
  tailwindcss: "#06B6D4",
  "tailwind css": "#06B6D4",
  html5: "#E34F26",
  css3: "#1572B6",
};

// Map display names to Simple Icons slug names
const iconSlugMap: Record<string, string> = {
  "next.js": "nextdotjs",
  "nextjs": "nextdotjs",
  "tanstack start": "tanstack",
  "tanstackstart": "tanstack",
  "rest apis": "rest",
  "webhooks": "webhooks",
  "ml fundamentals": "machinelearning",
  "express.js": "express",
  "expressjs": "express",
  "express": "express",
  "tailwind css": "tailwindcss",
  "tailwindcss": "tailwindcss",
  "node.js": "nodedotjs",
  "nodejs": "nodedotjs",
  "css3": "css",
};

// Icons to use from DevIcon (TechIcons) instead of Simple Icons
const devIconNames: Record<string, string> = {
  "matplotlib": "Matplotlib",
};

// Icons to use from Iconify instead of Simple Icons
const iconifyIcons: Record<string, string> = {
  "seaborn": "logos:seaborn-icon",
};

export default function TechIcon({ name, size = 24, className = "" }: TechIconProps) {
  const [imageError, setImageError] = useState(false);
  
  const techName = name.toLowerCase().trim();
  const color = techColors[techName] || "#787774";
  
  // Convert hex to rgba for background
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Check which CDN to use
  let iconUrl: string;
  
  if (devIconNames[techName]) {
    // Use DevIcon/TechIcons CDN for matplotlib
    iconUrl = `https://icon.icepanel.io/Technology/svg/${devIconNames[techName]}.svg`;
  } else if (iconifyIcons[techName]) {
    // Use Iconify CDN for seaborn
    iconUrl = `https://api.iconify.design/${iconifyIcons[techName]}.svg?color=${color.replace("#", "%23")}`;
  } else {
    // Use Simple Icons CDN for everything else
    const iconSlug = iconSlugMap[techName] || techName.replace(/[^a-z0-9]/g, "");
    iconUrl = `https://cdn.simpleicons.org/${iconSlug}/${color.replace("#", "")}`;
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