export const EXAM_BAZAR_DATA = {
  title: "Exam Bazar",
  subtitle: "High-Performance Ed-Tech Ecosystem",
  tagline: "Architecting a resilient marketplace for digital educational assets.",
  description: "A comprehensive Ed-Tech marketplace designed to streamline the delivery of educational resources through a modern, reliable e-commerce experience.",
  githubUrl: "https://github.com/GitCoder052023/ExamBazar",
  archiveUrl: "https://exambazar.in",
  
  // Non-technical / UX Features
  ecommerceFeatures: [
    "End-to-end shopping experience: Cart, Orders, Invoices, and Refunds",
    "Sophisticated marketplace search with multi-dimensional filtering (Subject, Board, Session, Price)",
    "Secure payment orchestration via Razorpay with automated invoice generation",
    "Marketing-driven UI with dynamic urgency triggers and promotional banners",
    "In-browser PDF previewing and secure digital asset delivery"
  ],

  // Chronological Backend Story
  story: [
    {
      title: "The Core: Dynamic Cluster Orchestration",
      description: "Implemented a custom Master-Worker process management system that goes beyond standard load balancing. The system monitors heap usage and request throughput in real-time to surgically spawn or terminate workers, ensuring zero-downtime micro-scaling within a single Node.js instance.",
      tech: ["Node.js Cluster", "Memory Guardrails", "Signal Handling"],
      icon: "Cpu"
    },
    {
      title: "The Flow: Atomic Transaction Integrity",
      description: "Designed a multi-stage order fulfillment pipeline. Payments are verified via SHA256 HMAC signatures, followed by atomic database transitions and simultaneous multi-key Redis cache invalidations to ensure strict data consistency across the distributed system.",
      tech: ["HMAC SHA256", "Redis Streams", "PostgreSQL"],
      icon: "Zap"
    },
    {
      title: "Digital Vault: Secure Asset Orchestration",
      description: "Engineered a secure document delivery system. Paid assets are validated against ownership records with real-time access tracking to manage refund eligibility. Samples are served through a separate low-latency pipeline with strictly scoped permissions.",
      tech: ["Supabase Storage", "Row Level Security", "Middleware"],
      icon: "Shield"
    },
    {
      title: "Document Engine: High-Fidelity PDF Generation",
      description: "Developed a server-side PDF generation engine using `pdf-lib`. It orchestrates complex multi-page layouts, embeds dynamic QR codes for order verification, and implements professional typography to deliver enterprise-grade invoices on-the-fly.",
      tech: ["pdf-lib", "QR Code API", "Buffers"],
      icon: "FileText"
    },
    {
      title: "Intelligence Layer: Context-Aware AI Support",
      description: "Integrated Google Gemini for automated support, utilizing a RAG-inspired pattern. The system injects actual legal documents into the LLM context to generate responses that are not just helpful, but strictly compliant with the platform's terms of service.",
      tech: ["Artificial Intelligence", "RAG Pattern", "Context Injection"],
      icon: "Mail"
    }
  ]
};
