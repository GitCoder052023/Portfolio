import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ROOT_METADATA } from "./config/seo";
import { SITE_CONFIG } from "./config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = ROOT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <link rel="canonical" href={SITE_CONFIG.url} />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: SITE_CONFIG.name,
              jobTitle: "Full-Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Self-Employed",
              },
              description: SITE_CONFIG.description,
              url: SITE_CONFIG.url,
              image: SITE_CONFIG.ogImage,
              sameAs: [
                SITE_CONFIG.links.github,
                SITE_CONFIG.links.linkedin,
                SITE_CONFIG.links.instagram,
                SITE_CONFIG.links.twitter,
                SITE_CONFIG.links.facebook,
                SITE_CONFIG.links.threads,
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express",
                "MongoDB",
                "PostgreSQL",
                "Web Development",
                "Full-Stack Development",
                "Frontend Development",
                "Backend Development",
                "Database Design",
              ],
              skills: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "PostgreSQL",
                "Express",
                "Tailwind CSS",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: SITE_CONFIG.url,
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: SITE_CONFIG.url,
              name: SITE_CONFIG.name + " - Full-Stack Developer",
              description: SITE_CONFIG.description,
              author: {
                "@type": "Person",
                name: SITE_CONFIG.name,
              },
              socialMediaAccount: [
                SITE_CONFIG.links.github,
                SITE_CONFIG.links.linkedin,
                SITE_CONFIG.links.twitter,
                SITE_CONFIG.links.instagram,
                SITE_CONFIG.links.facebook,
                SITE_CONFIG.links.threads,
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
