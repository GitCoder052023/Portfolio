import {
  Github,
  Linkedin,
  X,
  Instagram,
  Facebook,
  MessageCircle,
  Mail,
} from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: SITE_CONFIG.links.github,
    icon: Github,
    rel: "external nofollow",
  },
  {
    name: "LinkedIn",
    url: SITE_CONFIG.links.linkedin,
    icon: Linkedin,
    rel: "external nofollow",
  },
  {
    name: "X",
    url: SITE_CONFIG.links.twitter,
    icon: X,
    rel: "external nofollow",
  },
  {
    name: "Instagram",
    url: SITE_CONFIG.links.instagram,
    icon: Instagram,
    rel: "external nofollow",
  },
  {
    name: "Facebook",
    url: SITE_CONFIG.links.facebook,
    icon: Facebook,
    rel: "external nofollow",
  },
  {
    name: "Threads",
    url: SITE_CONFIG.links.threads,
    icon: MessageCircle,
    rel: "external nofollow",
  },
  {
    name: "Email",
    url: SITE_CONFIG.links.mail,
    icon: Mail,
    rel: "nofollow",
  },
];

export const SOCIAL_ICON_COLORS: Record<string, string> = {
  GitHub: "hover:text-gray-700",
  LinkedIn: "hover:text-blue-700",
  X: "hover:text-black",
  Instagram: "hover:text-pink-600",
  Facebook: "hover:text-blue-600",
  Threads: "hover:text-gray-700",
  Email: "hover:text-red-600",
};


