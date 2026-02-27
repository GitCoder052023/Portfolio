import type { Metadata } from "next";

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL("https://hamdankhubaib.in"),
  title: "Hamdan Khubaib | Full-Stack Developer & Creator",
  description:
    "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
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
    description:
      "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
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
    description:
      "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
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

export const HOME_METADATA: Metadata = {
  title: "Hamdan Khubaib | Full-Stack Developer & Creator",
  description:
    "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
  openGraph: {
    title: "Hamdan Khubaib | Full-Stack Developer & Creator",
    description:
      "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
    url: "https://hamdankhubaib.in",
  },
};

