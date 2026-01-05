import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hamdan Khubaib | Full-Stack Developer & Creator",
  description: "16-year-old full-stack developer from India. Building Exam Bazar - a centralized academic ecosystem. Expert in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, and Python. 6+ years of coding experience.",
  keywords: [
    "Hamdan Khubaib",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Web Developer India",
    "Exam Bazar",
    "Portfolio",
    "Full-Stack Engineer",
    "MongoDB",
    "PostgreSQL",
    "Python Developer",
  ],
  authors: [{ name: "Hamdan Khubaib" }],
  creator: "Hamdan Khubaib",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamdankhubaib.dev",
    title: "Hamdan Khubaib | Full-Stack Developer & Creator",
    description: "16-year-old full-stack developer building Exam Bazar. Expert in React, Next.js, Node.js, and Python.",
    siteName: "Hamdan Khubaib Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamdan Khubaib | Full-Stack Developer & Creator",
    description: "16-year-old full-stack developer building Exam Bazar. Expert in React, Next.js, Node.js, and Python.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://hamdankhubaib.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hamdan Khubaib",
              jobTitle: "Full-Stack Developer",
              description: "16-year-old full-stack developer from India building Exam Bazar",
              url: "https://hamdankhubaib.dev",
              sameAs: [
                "https://github.com/GitCoder052023",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express",
                "MongoDB",
                "PostgreSQL",
                "Python",
                "Web Development",
                "Full-Stack Development",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
