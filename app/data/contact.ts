import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaComment,
} from "react-icons/fa6";
import {
  IoMail,
  IoCall,
} from "react-icons/io5";
import { SITE_CONFIG } from "../config/site";

export const CONTACT_CONTENT = {
    header: {
        title: "Let's Build Together",
        description: "Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together."
    },
    cta: {
        title: "Ready to Start a Project?",
        description: "Whether you're looking for a full-stack developer, need help with a project, or want to discuss potential collaborations, I'm always open to new opportunities.",
        buttonLabel: "Get In Touch"
    }
};

export const CONTACT_METHODS = [
  {
    icon: IoMail,
    label: "Email",
    value: SITE_CONFIG.contact.email,
    href: SITE_CONFIG.links.mail,
    color: "from-red-50 to-orange-50",
    brandColor: "#EA4335",
  },
  {
    icon: IoCall,
    label: "Phone",
    value: SITE_CONFIG.contact.phone,
    href: `tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`,
    color: "from-green-50 to-emerald-50",
    brandColor: "#25D366",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: SITE_CONFIG.links.github.replace("https://", ""),
    href: SITE_CONFIG.links.github,
    color: "from-slate-50 to-gray-100",
    brandColor: "#181717",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: SITE_CONFIG.links.linkedin.replace("https://www.", ""),
    href: SITE_CONFIG.links.linkedin,
    color: "from-blue-50 to-indigo-50",
    brandColor: "#0077B5",
  },
  {
    icon: FaXTwitter,
    label: "X",
    value: "@" + SITE_CONFIG.links.twitter.split("/").pop(),
    href: SITE_CONFIG.links.twitter,
    color: "from-slate-50 to-gray-50",
    brandColor: "#000000",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@" + SITE_CONFIG.links.instagram.split("/").pop(),
    href: SITE_CONFIG.links.instagram,
    color: "from-pink-50 to-rose-50",
    brandColor: "#E4405F",
    bgGradient: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  },
  {
    icon: FaFacebook,
    label: "Facebook",
    value: SITE_CONFIG.links.facebook.split("/").pop(),
    href: SITE_CONFIG.links.facebook,
    color: "from-blue-50 to-blue-100",
    brandColor: "#1877F2",
  },
  {
    icon: FaComment,
    label: "Threads",
    value: "@" + SITE_CONFIG.links.threads.split("/").pop(),
    href: SITE_CONFIG.links.threads,
    color: "from-slate-50 to-gray-50",
    brandColor: "#000000",
  },
];


