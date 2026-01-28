import {
  FileText,
  Zap,
  Edit3,
  Bookmark,
  List,
  Type,
  Eye,
  Moon,
  TreePine,
  Code,
  Search,
  ZoomIn,
  RotateCw,
  Highlighter,
} from "lucide-react";

export const PIDIFY_FEATURES = [
  {
    icon: Eye,
    title: "Modern UI",
    description: "Clean, intuitive interface built with TailwindCSS",
    accent: "from-sky-100 to-blue-100",
  },
  {
    icon: Zap,
    title: "Responsive Design",
    description: "Seamless experience across all device sizes",
    accent: "from-amber-100 to-yellow-100",
  },
  {
    icon: FileText,
    title: "High Performance",
    description: "Optimized rendering with smooth animations",
    accent: "from-emerald-100 to-teal-100",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Full-text search across entire documents",
    accent: "from-violet-100 to-purple-100",
  },
  {
    icon: Edit3,
    title: "Annotations",
    description: "Highlights, notes, and drawing capabilities",
    accent: "from-rose-100 to-pink-100",
  },
  {
    icon: Bookmark,
    title: "Bookmarks",
    description: "Create and manage bookmarks for quick navigation",
    accent: "from-orange-100 to-red-100",
  },
  {
    icon: List,
    title: "Document Outline",
    description: "Auto-generated table of contents from PDF structure",
    accent: "from-cyan-100 to-sky-100",
  },
  {
    icon: Type,
    title: "Text Layer Support",
    description: "Searchable and selectable text in PDFs",
    accent: "from-lime-100 to-green-100",
  },
];

export const PIDIFY_CORE_FEATURES = [
  {
    icon: Code,
    title: "TypeScript First",
    description: "Fully typed for superior developer experience and IDE support",
    color: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200/50",
  },
  {
    icon: TreePine,
    title: "Tree-shakeable",
    description: "Only import what you need — keeps your bundle lean and fast",
    color: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200/50",
  },
  {
    icon: Moon,
    title: "Dark Mode Ready",
    description: "Fully compatible with dark mode themes out of the box",
    color: "from-slate-100 to-zinc-100",
    borderColor: "border-slate-300/50",
  },
];

export const PIDIFY_PREVIEW_TOOLS = [
  { icon: ZoomIn, label: "Zoom" },
  { icon: RotateCw, label: "Rotate" },
  { icon: Highlighter, label: "Highlight" },
  { icon: Bookmark, label: "Bookmark" },
  { icon: Search, label: "Search" },
];

