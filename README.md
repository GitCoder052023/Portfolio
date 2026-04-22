# My Portfolio

Welcome to my personal portfolio. This is a modern, high-performance website I built using Next.js 16, React 19, and Tailwind CSS. It's designed to showcase my journey as a "backend-first" developer, featuring smooth animations, interactive components, and real-time data from the GitHub API.

## Technologies I Use

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Data Fetching:** I've integrated the GitHub API to display my real-time contributions and stats.
- **Deployment:** Vercel (Optimized for Next.js)

## How I Structured This Project

```
├── app/                    # My primary Portfolio Application (Next.js 16)
│   ├── api/                # API routes I've built (e.g., GitHub stats)
│   ├── components/         # Reusable UI components
│   ├── config/             # Site, SEO, and API configurations
│   ├── controllers/        # Business logic for my API routes
│   ├── data/               # Static and content data
│   ├── hooks/              # My custom React hooks
│   ├── services/           # External service integrations (GitHub)
│   ├── types/              # TypeScript definitions
│   ├── ui/                 # Major UI sections and layouts
│   └── utils/              # Helper functions (e.g., rate limiter)
├── apps/                   # My sub-applications & Workspace Projects
│   ├── publications/       # A full-stack Publications platform I developed
├── public/                 # Static assets (images, PDFs)
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Key Features

- **Smooth Scroll:** I integrated a custom smooth scrolling experience for better UX.
- **Dynamic GitHub Stats:** I fetch my GitHub contributions and repository data in real-time.
- **Interactive Project Showcases:** 
  - **Pidify.js:** An interactive PDF viewer component I built.
  - **TailStack:** A terminal-themed UI showcase.
  - **Mega Projects:** Detailed sections for enterprise-level projects I've worked on, like *Exam Bazar* and my *Publications Platform*.
- **Sub-Applications (Workspace):**
  - **Publications:** A comprehensive writing platform with admin panel to publish and manage my writings
- **Tech Marquee:** An infinite scrolling marquee showcasing my technology stack.
- **Responsive Design:** I've fully optimized this for mobile, tablet, and desktop screens.
- **SEO Optimized:** I've included metadata, robots.txt, and sitemap generation.

## Getting Started

If you'd like to run my portfolio locally:

### Prerequisites

- Node.js 20+ 
- pnpm (recommended) or npm

### One Line Command

```bash
   git clone https://github.com/GitCoder052023/Portfolio.git && cd $_ && pnpm i && pnpm dev
   ```

> **Note:** Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Scripts

- `pnpm dev`: Starts my development server.
- `pnpm build`: Builds my application for production.
- `pnpm start`: Starts my production server.
- `pnpm lint`: Runs ESLint for code quality checks.

---

## 📄 License

This project is licensed under the MIT License.

That basically means — feel free to fork it, modify it, remix it, and build your own portfolio on top of it.

If you’re thinking *“this looks great, I might build my own portfolio on top of it”* —  
**go ahead, kick the paddle 🚀**

---

Built with ❤️ by me.