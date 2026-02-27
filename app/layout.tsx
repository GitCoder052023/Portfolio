import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ROOT_METADATA } from "./config/seo";

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
        <link rel="canonical" href="https://hamdankhubaib.in" />
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
              name: "Hamdan Khubaib",
              jobTitle: "Full-Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Self-Employed",
              },
              description: "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
              url: "https://hamdankhubaib.in",
              image: "https://img.genillu.com/gen/dBCBh5E8lS1T.png",
              sameAs: [
                "https://github.com/GitCoder052023",
                "https://www.linkedin.com/in/hamdan-khubaib-3046b8331",
                "https://instagram.com/hamdankhubaib.code",
                "https://x.com/HamdanKhu41893",
                "https://www.facebook.com/HamdanKhubaib",
                "https://threads.com/@hamdankhubaib.code",
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
                  item: "https://hamdankhubaib.in",
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
              url: "https://hamdankhubaib.in",
              name: "Hamdan Khubaib - Full-Stack Developer",
              description: "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
              author: {
                "@type": "Person",
                name: "Hamdan Khubaib",
              },
              socialMediaAccount: [
                "https://github.com/GitCoder052023",
                "https://www.linkedin.com/in/hamdan-khubaib-3046b8331",
                "https://x.com/HamdanKhu41893",
                "https://instagram.com/hamdankhubaib.code",
                "https://www.facebook.com/HamdanKhubaib",
                "https://threads.com/@hamdankhubaib.code",
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
