import { Briefcase, Code2, MapPin, Terminal } from "lucide-react";

export const ABOUT_STATS = [
  { 
    label: "Coding Experience", 
    value: "6+ Years", 
    icon: Code2, 
    color: "bg-amber-50/50", 
    iconColor: "text-amber-600" 
  },
  { 
    label: "Web Development", 
    value: "3+ Years", 
    icon: Briefcase, 
    color: "bg-blue-50/50", 
    iconColor: "text-blue-600" 
  },
  { 
    label: "Python Experience", 
    value: "4+ Years", 
    icon: Terminal, 
    color: "bg-emerald-50/50", 
    iconColor: "text-emerald-600" 
  },
  { 
    label: "Based In", 
    value: "India", 
    icon: MapPin, 
    color: "bg-rose-50/50", 
    iconColor: "text-rose-600" 
  },
];

export const TECH_CATEGORIES = [
  {
    category: "Frontend",
    techs: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "next.js" },
      { name: "TanStack Start", icon: "tanstack start" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    category: "Backend",
    techs: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    category: "Data",
    techs: [
      { name: "Python", icon: "python" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Matplotlib", icon: "matplotlib" },
      { name: "Seaborn", icon: "seaborn" },
      { name: "Plotly", icon: "plotly" },
    ],
  },
];

