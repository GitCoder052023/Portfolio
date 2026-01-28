import {
  Zap,
  Package,
  Code2,
  Sliders,
  Shield,
  Brain,
  Rocket,
  Layers,
  Settings,
} from "lucide-react";

export const TAILSTACK_FEATURES = [
  {
    icon: Package,
    title: "Proven Architecture",
    description: "TailStack Architecture — battle-tested for production-grade applications",
    accent: "from-amber-100 to-orange-100",
  },
  {
    icon: Zap,
    title: "Hit the Ground Running",
    description: "Pre-configured tools and beautiful UI system out of the box",
    accent: "from-yellow-100 to-amber-100",
  },
  {
    icon: Sliders,
    title: "Fully Customizable",
    description: "Not a rigid framework — adapt to your specific needs",
    accent: "from-emerald-100 to-teal-100",
  },
  {
    icon: Shield,
    title: "Industry-Standard Tooling",
    description: "Rigorous linting, TypeScript, and best practices built-in",
    accent: "from-sky-100 to-blue-100",
  },
  {
    icon: Rocket,
    title: "Scalable Foundation",
    description: "Perfect for MVPs and large-scale enterprise solutions",
    accent: "from-violet-100 to-purple-100",
  },
  {
    icon: Code2,
    title: "Full-Stack Ready",
    description: "Express, React, and Node.js perfectly integrated",
    accent: "from-rose-100 to-pink-100",
  },
];

export const TAILSTACK_HIGHLIGHTS = [
  {
    icon: Brain,
    title: "ERN Stack",
    description: "Express, React, Node.js — complete full-stack solution with modern tooling",
    color: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200/50",
  },
  {
    icon: Layers,
    title: "Monorepo Ready",
    description: "Organized workspace structure with shared configurations",
    color: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200/50",
  },
  {
    icon: Settings,
    title: "Production-Grade",
    description: "Robust structure tested in real-world applications at scale",
    color: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200/50",
  },
];

export type TailstackTerminalLineType =
  | "command"
  | "output"
  | "success"
  | "ready"
  | "section"
  | "processing";

export interface TailstackTerminalLine {
  type: TailstackTerminalLineType;
  text: string;
  delay: number;
}

export const TAILSTACK_TERMINAL_LINES: TailstackTerminalLine[] = [
  { type: "section", text: "→ Initializing TailStack environment...", delay: 0 },
  { type: "command", text: "pnpm install", delay: 800 },
  { type: "output", text: "Resolving dependencies...", delay: 1200 },
  { type: "processing", text: "├─ typescript@5.x", delay: 1800 },
  { type: "processing", text: "├─ vite@6.x", delay: 2200 },
  { type: "processing", text: "├─ react@19.x", delay: 2600 },
  { type: "processing", text: "├─ express@5.x", delay: 3000 },
  { type: "processing", text: "├─ tailwindcss@4.x", delay: 3400 },
  { type: "processing", text: "└─ shadcn/ui@latest", delay: 3800 },
  { type: "output", text: "Packages: +847 ++++++++++++++++++++++++++", delay: 4800 },
  { type: "success", text: "Dependencies installed successfully", delay: 5800 },
  { type: "section", text: "→ Starting development servers...", delay: 10800 },
  { type: "command", text: "pnpm dev", delay: 11400 },
  { type: "success", text: "Frontend ready on http://localhost:3000", delay: 12200 },
  { type: "success", text: "Backend API on http://localhost:5000", delay: 13000 },
  { type: "success", text: "Hot reload enabled for all packages", delay: 13800 },
  { type: "success", text: "TypeScript type checking active", delay: 14600 },
  { type: "section", text: "→ Setup complete!", delay: 15400 },
  { type: "ready", text: "Ready to build your next incredible project 🚀", delay: 16200 },
];

