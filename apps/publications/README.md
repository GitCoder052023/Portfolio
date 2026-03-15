# Writings — Hamdan Khubaib

> *"To find truth, stop believing — start thinking."*

A public journal of philosophical and scientific inquiry. Research papers, formal theories, and serious writings on epistemology, consciousness, physics, ethics, and the questions that resist easy answers.

This is not a blog. This is not a portfolio. This is a space where ideas are documented, exposed to scrutiny, and opened for intellectual conversation.

---

## What This Space Is

- **A Public Journal** — Formal writings published openly, accessible to anyone
- **An Invitation to Think** — Every publication is an invitation to engage, question, and respond
- **Domains of Inquiry** — Epistemology, consciousness, physics, AI, ethics, religion, power dynamics, and more

## Features

### For Readers (No Login Required)
- 📖 **Read Publications** - Browse and read all publications freely
- 📥 **Download PDFs** - Download any publication as PDF
- 🔗 **Share** - Share publications via social media or copy link
- 🏷️ **Browse by Category** - Filter by Research Papers, Philosophical Papers, Conceptual Papers

### For Registered Users
- ❤️ **Like Publications** - Show appreciation for papers you enjoy
- 💬 **Comment** - Join discussions on publications
- 👤 **Profile** - Manage your account via Clerk

### Technical Highlights
- 🔒 **Secure by Design** - Row Level Security (RLS) on all database tables
- 📊 **Analytics** - Track downloads per publication
- ⚡ **Performance** - Server Components, optimized images, lazy loading
- 🎨 **Modern UI** - Clean, professional, academic aesthetic
- 📱 **Responsive** - Works on all device sizes

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Animations | Motion (Framer Motion) |
| Toasts | Sonner |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Auth | Clerk |
| Language | TypeScript |

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm
- Supabase account
- Clerk account

### 1. Clone and Install

```bash
cd apps/publications
pnpm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema from `supabase/schema.sql`
3. Create a storage bucket named `publications` with public access
4. Get your keys from **Project Settings > API**

### 3. Set Up Clerk

1. Create a new Clerk application at [clerk.com](https://clerk.com)
2. Enable Email/Password authentication
3. Set up a webhook for user sync:
   - URL: `https://your-domain.com/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
4. Get your keys from the dashboard

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Publications
NEXT_PUBLIC_AUTHOR_NAME=Your Name
```

### 5. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Adding Publications

### 1. Upload PDFs to Supabase Storage

Upload PDF files to the `publications` bucket with paths like:
- `research-papers/your-paper-slug.pdf`
- `philosophical-papers/your-paper-slug.pdf`
- `conceptual-papers/your-paper-slug.pdf`

### 2. Add Publication Metadata

Insert a row into the `publications` table:

```sql
INSERT INTO publications (
  slug,
  title,
  description,
  abstract,
  category,
  tags,
  pdf_path,
  pdf_size_bytes,
  page_count,
  is_featured
) VALUES (
  'your-paper-slug',
  'Your Paper Title',
  'A brief description of your paper.',
  'The full abstract text...',
  'research-paper', -- or 'philosophical-paper', 'conceptual-paper'
  ARRAY['tag1', 'tag2', 'tag3'],
  'research-papers/your-paper-slug.pdf',
  1234567, -- file size in bytes
  42, -- number of pages
  true -- set to true to feature on homepage
);
```

## Project Structure

```
apps/publications/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── publications/         # Publication endpoints
│   │   └── webhooks/             # Clerk webhook
│   ├── about/                    # About page
│   ├── categories/               # Category pages
│   ├── publications/             # Publication pages
│   ├── sign-in/                  # Auth pages
│   ├── sign-up/
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── layout/                   # Header, Footer, Container
│   ├── motion/                   # Animation wrappers
│   └── publications/             # Publication components
├── lib/                          # Utilities & business logic
│   ├── clerk/                    # Clerk utilities
│   ├── supabase/                 # Supabase clients & queries
│   ├── config.ts                 # App configuration
│   ├── constants.ts              # Static constants
│   └── utils.ts                  # Utility functions
├── types/                        # TypeScript types
├── supabase/
│   └── schema.sql                # Database schema
├── middleware.ts                 # Clerk middleware
└── .env.example                  # Environment template
```

## Architecture Principles

- **Modular Monolith** - Organized by feature with clear boundaries
- **DRY** - Shared utilities and components
- **Single Responsibility** - Each module has one job
- **Separation of Concerns** - UI, logic, and data are separated
- **Security First** - RLS policies, read-only client access

## Security

- **Row Level Security (RLS)** - Database access controlled at row level
- **Service Role Isolation** - Admin operations only in API routes
- **Webhook Verification** - Clerk webhooks verified with Svix
- **Input Validation** - All user input validated server-side
- **Security Headers** - X-Frame-Options, CSP, etc.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:
```bash
pnpm build
pnpm start
```

## License

All writings are authored by Hamdan Khubaib. The content is publicly accessible for reading, discussion, and citation.

---

*Ideas are meant to be challenged. If you disagree, make your argument.*
