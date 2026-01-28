"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Facebook, MessageCircle, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/GitCoder052023",
    icon: Github,
    color: "hover:text-gray-700",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/hamdan-khubaib-3046b8331",
    icon: Linkedin,
    color: "hover:text-blue-700",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/HamdanKhu41893",
    icon: Twitter,
    color: "hover:text-black",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/hamdankhubaib.code",
    icon: Instagram,
    color: "hover:text-pink-600",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/HamdanKhubaib",
    icon: Facebook,
    color: "hover:text-blue-600",
  },
  {
    name: "Threads",
    url: "https://threads.com/@hamdankhubaib.code",
    icon: MessageCircle,
    color: "hover:text-gray-700",
  },
  {
    name: "Email",
    url: "mailto:hamdankhubaib959@gmail.com",
    icon: Mail,
    color: "hover:text-red-600",
  },
];

export default function SocialLinks() {
  return (
    <nav 
      className="flex items-center gap-4" 
      aria-label="Social Media Links"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target={social.name !== "Email" ? "_blank" : undefined}
          rel={social.name !== "Email" ? "external nofollow" : undefined}
          aria-label={`Visit ${social.name}`}
          title={social.name}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`text-gray-600 transition-colors ${social.color}`}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </nav>
  );
}
