export const PUBLICATIONS_BACKEND_DATA = {
  name: "Publications (Writing Platform)",
  tagline: "Scalable Full-Stack Infrastructure",
  description: "A high-performance writing platform built with a modular backend architecture, featuring real-time synchronization, robust API layers, and type-safe database management.",
  githubUrl: "https://github.com/GitCoder052023/Portfolio/tree/main/apps/publications", // Assuming this is the URL
  liveUrl: "https://publications.hamdankhubaib.in",
  backgroundColors: {
    top: "from-[#f3f3f2]",
    bottom: "to-[#ffffff]"
  },
  userFeatures: [
    { 
      title: "Public Journaling", 
      description: "A specialized space for formal writings, research papers, and theoretical inquiries with optimized reading layouts.",
      icon: "Feather"
    },
    { 
      title: "Domain Categorization", 
      description: "Organizes intellectual content into specific 'Domains of Inquiry' such as Epistemology, Consciousness, and Science.",
      icon: "Grid"
    },
    { 
      title: "Intellectual Discussion", 
      description: "Integrated discussion engine (Clerk Auth) that enables users to challenge arguments and provide alternative perspectives.",
      icon: "MessageCircle"
    },
    { 
      title: "Interaction Engine", 
      description: "Full suite of engagement tools including real-time likes, nested commenting systems, and social sharing.",
      icon: "Heart"
    }
  ],
  highlights: [
    {
      title: "Modular Service Architecture",
      description: "Implemented a clean Controller-Service-Repository pattern in Next.js, separating HTTP handling, business logic, and database interactions for maximum maintainability.",
      icon: "Layers"
    },
    {
      title: "Real-time User Sync",
      description: "Engineered a robust webhook system using Clerk and Svix to synchronize user data across authentication providers and the Supabase Postgres database in real-time.",
      icon: "RefreshCw"
    },
    {
      title: "Type-Safe Data Layer",
      description: "Built a fully type-safe interaction layer with Supabase, leveraging Zod for schema validation and TypeScript for end-to-end type safety from DB to UI.",
      icon: "ShieldCheck"
    },
    {
      title: "Advanced API Engine",
      description: "Developed a comprehensive API with complex filtering, pagination, searching, and sorting capabilities to handle large-scale content delivery efficiently.",
      icon: "Cpu"
    }
  ],
  features: [
    { title: "Service Pattern", description: "Modular Controller-Service architecture", icon: "Box" },
    { title: "Supabase DB", description: "Postgres with Row Level Security", icon: "Database" },
    { title: "Clerk Sync", description: "Webhook synchronization via Svix", icon: "UserCheck" },
    { title: "Zod Validation", description: "Schema-first type safety", icon: "ShieldCheck" },
    { title: "Rate Limiting", description: "Custom token bucket middleware", icon: "Zap" },
    { title: "LRU Caching", description: "Optimized read performance", icon: "HardDrive" },
    { title: "Real-time Engine", description: "Socket-based interaction sync", icon: "Activity" },
    { title: "Error Handling", description: "Global exception management layer", icon: "AlertTriangle" }
  ]
};
