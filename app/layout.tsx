import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamdankhubaib.in"),
  title: "Hamdan Khubaib | Full-Stack Developer & Creator",
  description: "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
  keywords: [
    "Hamdan Khubaib",
    "Hamdan khubaib",
    "hamdan khubaib",
    "hamdan",
    "khubaib",
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
    "Software Engineer India",
    "Web Development",
    "MERN Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Web Developer",
    "JavaScript Developer",
    "Young Developer",
    "Web Developer",
  ],
  authors: [{ name: "Hamdan Khubaib", url: "https://hamdankhubaib.in" }],
  creator: "Hamdan Khubaib",
  category: "Technology",
  applicationName: "Hamdan Khubaib Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamdankhubaib.in",
    title: "Hamdan Khubaib | Full-Stack Developer & Creator",
    description: "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
    siteName: "Hamdan Khubaib Portfolio",
    images: [
      {
        url: "https://img.genillu.com/gen/dBCBh5E8lS1T.png",
        width: 1200,
        height: 1200,
        alt: "Hamdan Khubaib - Full-Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamdan Khubaib | Full-Stack Developer & Creator",
    description: "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
    images: ["https://img.genillu.com/gen/dBCBh5E8lS1T.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
                "Python",
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
                "Python",
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
              description: "16-year-old full-stack developer from India. Building Exam Bazar.",
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
