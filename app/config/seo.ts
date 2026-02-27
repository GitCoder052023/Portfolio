import type { Metadata } from "next";
import { SITE_CONFIG } from "./site";

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: SITE_CONFIG.name + " | Full-Stack Developer & Creator",
  description: SITE_CONFIG.description,
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
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  category: "Technology",
  applicationName: SITE_CONFIG.name + " Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name + " Portfolio",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 1200,
        alt: SITE_CONFIG.name + " - Full-Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
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
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
  },
};


